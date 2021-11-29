import React from "react";
import "./App.css";
import Home from "./LandingPage/Home";
import Header from "./Header/Header";
import Login from "./Login/Login1";
import MyProjects from "./MyProjectsPage/MyProjects";
import MyTeam from "./MyTeamPage/MyTeam1";
import TeamSkills from "./TeamSkillsPage/TeamSkills1";
import Trends from "./TrendsPage/Trends";
import RegisterUser from "./RegisterPage/RegisterUser";
import Welcome from "./Welcome";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
//Router - Everything enclosed under Router will be eligible for Routing
//Route - Renders out the component based on the URL

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        {/* <Home /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Projects" component={MyProjects} />
          <Route path="/Team" component={MyTeam} />
          <Route path="/Skills" component={TeamSkills} />
          <Route path="/Trends" component={Trends} />
          <Route path="/Register" component={RegisterUser} />
          <Route path="/Login" component={Login} />
          <Route path="/Logout" component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
