import React from "react";
import "./App.css";
import Home from "./LandingPage/Home";
import Login from "./Login/Login1";
import RoadMapSkills from "./RoadMapSkills/RoadMapSkills";
import MyTeam from "./MyTeamPage/MyTeam1";
import TeamSkills from "./TeamSkillsPage/TeamSkills1";
import Trends from "./TrendsPage/Trends";
import RegisterUser from "./RegisterPage/RegisterUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./LogoutPage/Logout";

//Router - Everything enclosed under Router will be eligible for Routing
//Route - Renders out the component based on the URL

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Home" exact component={Home} />
          <Route path="/Roadmap" component={RoadMapSkills} />
          <Route path="/Team" component={MyTeam} />
          <Route path="/Skills" component={TeamSkills} />
          <Route path="/Trends" component={Trends} />
          <Route path="/Register" component={RegisterUser} />
          <Route path="/Login" component={Login} />
          <Route path="/Logout" component={Logout} />
        </Switch>
      </Router>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(App);
