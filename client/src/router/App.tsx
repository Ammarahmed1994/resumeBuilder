/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "src/pages/Authentication/Login";
import Signup from "src/pages/Authentication/SignUp";
import ResumeBuilder from "src/pages/ResumeBuilder";
import StartPage from "src/pages/StartPage";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={StartPage} />
          <Route exact path="/resumeBuilder" component={ResumeBuilder} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
