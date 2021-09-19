import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Results from "./pages/Results";
import CONTENT_CATEGORIES from "./constants/contentCategories";
import COLORS from "./constants/colors";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [userPhotos, setUserPhotos] = useState(null);
  const [accessTokenGooglePhotos, setAccessTokenGooglePhotos] = useState(null);
  const [googlePhotoContentCategories, setGooglePhotoContentCategories] =
    useState(null);
  const [dominantColors, setDominantColors] = useState(null);
  const [mostCommonLabels, setMostCommonLabels] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (user && accessTokenGooglePhotos) {
      fetchPhotos();
      fetchGooglePhotoData();
    }
  }, [user, accessTokenGooglePhotos]);

  useEffect(() => {
    if (userPhotos) {
      fetchVisionAIColors();
      fetchVisionAILabels();
    }
  }, [userPhotos]);

  // maximum 100 photos per page
  const fetchPhotos = async () => {
    console.log(accessTokenGooglePhotos);
    const response = await fetch(
      "https://photoslibrary.googleapis.com/v1/mediaItems?pageSize=100",
      {
        method: "GET",
        pageSize: 100,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessTokenGooglePhotos}`,
        },
      }
    );
    const photoData = await response.json();
    const photoUrls = photoData.mediaItems.map((item) => item.baseUrl);
    setUserPhotos(photoUrls);
  };

  // maximum 100 photos (per page, then have to cycle through next pages)
  const fetchGooglePhotoData = async () => {
    // see this as legend for which index is which count
    const categoryCounts = await Promise.all(
      CONTENT_CATEGORIES.map(async (category) => {
        const response = await fetch(
          "https://photoslibrary.googleapis.com/v1/mediaItems:search",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${accessTokenGooglePhotos}`,
            },
            body: JSON.stringify({
              pageSize: 100,
              filters: {
                contentFilter: {
                  includedContentCategories: [category],
                },
              },
            }),
          }
        ).then((res) => res.json());
        if (response.mediaItems) {
          return response.mediaItems.length;
        } else {
          return 0;
        }
      })
    );
    console.log(categoryCounts);
    setGooglePhotoContentCategories(categoryCounts);
  };

  const fetchVisionAIColors = async () => {
    const visionAIResponses = await Promise.all(
      userPhotos.map(async (url) => {
        const response = await fetch(
          "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA7CGhkhV3wm0OxJY_Sr2xdUvPBnECQepo",
          {
            method: "POST",
            body: JSON.stringify({
              requests: [
                {
                  image: {
                    source: {
                      imageUri: url,
                    },
                  },
                  features: [
                    {
                      type: "IMAGE_PROPERTIES",
                    },
                  ],
                },
              ],
            }),
          }
        ).then((res) => res.json());
        const dominantColor =
          response.responses[0].imagePropertiesAnnotation.dominantColors.colors.sort(
            (e1, e2) => e2.pixelFraction - e1.pixelFraction
          )[0].color;

        for (let i = 0; i < COLORS.length; i++) {
          COLORS[i].distance =
            (dominantColor.red - COLORS[i].red) ^
            (2 + (dominantColor.green - COLORS[i].green)) ^
            (2 + (dominantColor.blue - COLORS[i].blue)) ^
            2 ^
            (1 / 2);
        }
        COLORS.sort((e1, e2) => e1.distance - e2.distance);

        return COLORS[0].color;
      })
    );
    console.log(visionAIResponses);
    setDominantColors(visionAIResponses);
  };



  const fetchVisionAILabels = async () => {
    // finding image labels
    const visionAILabels = await Promise.all(
      userPhotos.map(async (url) => {
        const response = await fetch(
          "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA7CGhkhV3wm0OxJY_Sr2xdUvPBnECQepo",
          {
            method: "POST",
            body: JSON.stringify({
              requests: [
                {
                  image: {
                    source: {
                      imageUri: url,
                    },
                  },
                  features: [
                    {
                      type: "LABEL_DETECTION",
                    },
                  ],
                },
              ],
            }),
          }
        ).then((res) => res.json());
        console.log(response);
        return response.responses[0].labelAnnotations.map(
          (elem) => elem.description
        );
      })
    );

    const labels = [].concat.apply([], visionAILabels);

    const freqArray = [];

    for (let i = 0; i < labels.length; i++) {
      if (freqArray.length != 0) {
        let found = false;
        for (let j = 0; j < freqArray.length; j++) {
          if (labels[i] === freqArray[j].name) {
            freqArray[j].count++;
            found = true;
            break;
          }
        }
        if (!found) {
          freqArray.push({
            name: labels[i],
            count: 1,
          });
        }
      } else {
        freqArray.push({
          name: labels[i],
          count: 1,
        });
      }
    }

    freqArray.sort((elem1, elem2) => elem2.count - elem1.count);
    setMostCommonLabels([
      freqArray[0].name,
      freqArray[1].name,
      freqArray[2].name,
      freqArray[3].name
    ]);
  };

  const handleLogin = (user, token) => {
    setUser(user);
    setAccessTokenGooglePhotos(token);
  };

  return (
    <Router>
      <Switch>
        <Route path="/results">
          <Results
            user={user}
            dominantColors={dominantColors}
            mostCommonLabels={mostCommonLabels}
            googlePhotoContentCategories={googlePhotoContentCategories}
          />
        </Route>
        <Route path="/">
          {dominantColors && googlePhotoContentCategories ? (
            <Redirect to="/results" />
          ) : (
            <Home handleLogin={handleLogin} fetchPhotos={fetchPhotos} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
