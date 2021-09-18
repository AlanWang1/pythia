import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Results  from './pages/Results';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/results">
            <Results />
          </Route>
          <Route path = '/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
