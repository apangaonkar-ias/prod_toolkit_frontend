import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Widgets from "./Widgets/Widgets";
import Login from "./Login/Login";
import teamImage from "./images/team.png";
import teamSkillImage from "./images/skills.jpg";
import trendImage from "./images/trends.png";
import projectImage from "./images/project.png";
import Footer from "./Footer/Footer.js";
import MyProjects from "./MyProjectsPage/MyProjects";
import MyTeam from "./MyTeamPage/MyTeam";
import TeamSkills from "./TeamSkillsPage/TeamSkills";
import Trends from "./TrendsPage/Trends";
import Home from "./Home";
import RegisterUser from "./RegisterPage/RegisterUser";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
//Router - Everything enclosed under Router will be eligible for Routing
//Route - Renders out the component based on the URL

function App() {
  return (
    <>
      {/* <Home /> */}
      <Router>
        <Header />
      </Router>
      <div>
        <Login />
      </div>
      <CssBaseline />
    </>
  );
}

export default App;
