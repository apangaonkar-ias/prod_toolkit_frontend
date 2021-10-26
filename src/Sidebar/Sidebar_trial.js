import { Avatar } from "@mui/material";
import React from "react";
import "./Sidebar.css";
import EditIcon from "@mui/icons-material/Edit";
import HeaderOption from "./Header/HeaderOption";


export default class Sidebar_trial extends Component {
    
    render() {
        return (
            <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://t4.ftcdn.net/jpg/04/37/40/57/360_F_437405726_kV9oEWWC1NTKb7gpm5HyXcAx6S0oS1m2.jpg"
          alt=""
        />
        <Avatar className="sidebar__avatar" />
        {/* Employee Name */}
        <h2>Aditya Pangaonkar</h2>
        {/* Employee Email Id */}
        <h4>apangaonkar@integralads.com</h4>
      </div>
      <div className="sidebar__profile">
        <div className="sidebar__profile__details">
          <p>Department</p>
          <p className="sidebar__profile__value">Business Intelligence</p>
        </div>
        <div className="sidebar__profile__details">
          <p>Role</p>
          <p className="sidebar__profile__value">Software Developer</p>
        </div>
        <div className="sidebar__profile__details">
          <p>Org Level</p>
          <p className="sidebar__profile__value">Intern</p>
        </div>
        <div className="sidebar__profile__details">
          <p>Team</p>
          <p className="sidebar__profile__value">PURE</p>
        </div>
        <div className="sidebar__profile__details">
          <p>Total Experience</p>
          <p className="sidebar__profile__value">1 year</p>
        </div>
        <div className="sidebar__profile__details">
          <p>AdTech Experience</p>
          <p className="sidebar__profile__value">1 month</p>
        </div>
        <div className="sidebar__profile__details">
          <p>Certifications</p>
          <p className="sidebar__profile__value">AWS | Google Cloud</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        {/* <div className="skills__top"> */}
        <h3>My Skills</h3>

        {/* <HeaderOption Icon={EditIcon} title="Edit" /> */}
        {/* </div> */}
        <div className="sidebar__skills">
          <p>ReactJS</p>
          <p className="sidebar__profile__value">Expert</p>
        </div>

        <div className="sidebar__skills">
          <p>Java</p>
          <p className="sidebar__profile__value">Intermediate</p>
        </div>

        <div className="sidebar__skills">
          <p>SpringBoot</p>
          <p className="sidebar__profile__value">Beginner</p>
        </div>

        <div className="sidebar__skills">
          <p>Looker</p>
          <p className="sidebar__profile__value">Beginner</p>
        </div>

        <div className="sidebar__skills">
          <p>Python</p>
          <p className="sidebar__profile__value">Expert</p>
        </div>

        <div className="sidebar__skills">
          <p>Data Science</p>
          <p className="sidebar__profile__value">Intermediate</p>
        </div>
      </div>
    </div>
        )
    }
}
