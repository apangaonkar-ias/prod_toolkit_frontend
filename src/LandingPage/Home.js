import React from "react";
import "../App.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Widgets/Widgets";
import Login from "../Login/Login";
import teamImage from "../images/team.png";
import teamSkillImage from "../images/skills.jpg";
import trendImage from "../images/trends.png";
import projectImage from "../images/project.png";
import Footer from "../Footer/Footer.js";
import RoadMapSkills from "../RoadMapSkills/RoadMapSkills";
import MyTeam from "../MyTeamPage/MyTeam1";
import TeamSkills from "../TeamSkillsPage/TeamSkills1";
import Trends from "../TrendsPage/Trends";
// import Home from "./Home";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import RegisterUser from "../RegisterPage/RegisterUser";

//Router - Everything enclosed under Router will be eligible for Routing
//Route - Renders out the component based on the URL

function Home() {
  return (
    // <Router>

    <div className="app">
      <Header />

      <div className="app__body" style={{ height: "688px" }}>
        {/* App Body */}
        <div style={{ marginTop: "8px" }}>
          <Sidebar />
        </div>

        {/* <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Projects" component={MyProjects} />
            <Route path="/Team" component={MyTeam} />
            <Route path="/Skills" component={TeamSkills} />
            <Route path="/Trends" component={Trends} /> */}
        {/* <Route path="/edit/:id" component={RegisterUser} /> */}
        {/* <Route path="/Register" component={RegisterUser} />
//          <Route path="/Login" component={Login} /> */}

        <div className="widgetsss">
          <div className="widget_padding">
            <Link to="/Team" style={{ textDecoration: "none" }}>
              <Widgets
                title="My Team"
                description="Manage & Organize your team here"
                image={teamImage}
                button_text="Manage Team"
              />
            </Link>
          </div>

          <div className="widget_padding">
            <Link to="/Roadmap" style={{ textDecoration: "none" }}>
              <Widgets
                title="Skill Roadmap"
                description="View Skills Roadmap in one go!"
                image={projectImage}
                button_text="Manage Roadmap"
              />
            </Link>
          </div>

          <div className="widget_padding">
            <Link to="/Skills" style={{ textDecoration: "none" }}>
              <Widgets
                title="Team Skills"
                description="View the skills your team possesses"
                image={teamSkillImage}
                button_text="View Skills"
              />
            </Link>
          </div>

          <div className="widget_padding">
            <Link to="/Trends" style={{ textDecoration: "none" }}>
              <Widgets
                title="Trends"
                description="View skill development trends"
                image={trendImage}
                button_text="Check Trends"
              />
            </Link>
          </div>
        </div>
        {/* </Switch> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
    // </Router>
  );
}

export default Home;
