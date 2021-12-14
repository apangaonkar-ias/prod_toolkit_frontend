import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Widgets from "../Widgets/Widgets";
import teamImage from "../images/team.png";
import teamSkillImage from "../images/skills.jpg";
import trendImage from "../images/trends.png";
import projectImage from "../images/project.png";
import Footer from "../Footer/Footer.js";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

//Router - Everything enclosed under Router will be eligible for Routing
//Route - Renders out the component based on the URL

function Home() {
  let user = [];
  const [users, setUsers] = useState([]);

  const getLoggedInDetails = () => {
    var config = {
      method: "get",
      url: "http://localhost:8080/toolkit/getEmpDetails",
      headers: {
        Authorization: `Bearer ${localStorage.jwtToken}`,
      },
    };

    axios(config)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        user = data;
        console.log(user);
        setUsers(data);
      });
  };

  console.log(users);

  const currentUsers = users.slice();
  console.log(currentUsers);

  useEffect(() => {
    getLoggedInDetails();
  }, []);

  return (
    <div className="app">
      <Header />

      <div className="app__body" style={{ height: "688px" }}>
        <div style={{ marginTop: "8px" }}>
          <Sidebar />
        </div>

        {currentUsers.map((user) => (
          <div className="widgetsss" key={user.e_id}>
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

            {user.role === "Manager" || user.role === "Business Head" ? (
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
            ) : (
              ""
            )}
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
            {user.role === "Business Head" ? (
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
            ) : (
              ""
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
