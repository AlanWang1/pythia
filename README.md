# Pythia

A fun fortune teller powered by Google Photos and Google Cloud Vision AI
- Login with your google photos, and Pythia will give a horoscope style reading based off the contents of your google photos!
- Google Cloud Vision API is used to give you a horoscope style reading based off common items, colors, moods that are in your google photos

![image](https://github.com/AlanWang1/pythia/assets/43789278/ba043f35-5340-4fbc-a559-9d3e05223972)


![image](https://github.com/AlanWang1/pythia/assets/43789278/e6aee92e-e7a4-4b8a-8e8e-ae1cbe19deaa)


## Inspiration

You can tell a lot about someone through the photos in their camera roll, so we thought it would be a fun idea to create an application that makes predictions and attempts to infer certain aspects of your life via your camera roll! We were inspired to create a digital fortune teller of sorts that makes horoscope style readings using certain aspects and the subject matter of your photos.

## How we built it

We used React.js and integrated the Google Cloud Vision API as well as the Google Photos Library API. All this is coded primarily as a front end application, using RESTful services from both APIs. We also integrated Google Oauth so users can login with their google account and sync their photos to our web application. Once the user is authenticated, these photos are sent to the Google Cloud Vision API for further analysis. The data from the Cloud Vision API data is then run through our fortune teller algorithm, where certain key entities and sentiments of images are used to inform certain predictions!

## Tech Stack

- ReactJS - frontend
- Google Cloud Platform - Google Photos Library API, Google Cloud Vision API, Google OAuth
