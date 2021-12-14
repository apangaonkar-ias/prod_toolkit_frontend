import React, { useState, useEffect } from "react";
import "./Header.css";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { connect } from "react-redux";
import { logoutUser } from "../Services/index";
import axios from "axios";

function Header(props) {
  let logout = () => {
    props.logoutUser();
  };
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

  const currentUsers = users.slice();
  console.log(currentUsers);
  console.log(users);

  const guestLinks = () => (
    <>
      <div className="header__right">
        <Link to="/Login" style={{ textDecoration: "none" }}>
          <HeaderOption Icon={LoginIcon} title="Login" />
        </Link>

        <Link to="/Login" style={{ textDecoration: "none" }}>
          <HeaderOption Icon={PersonAddIcon} title="Register" />
        </Link>
      </div>
    </>
  );

  const userLinks = () => (
    <>
      {/* {console.log(user.role)} */}
      {currentUsers.map((user) => (
        <div className="header__right">
          <Link to="/" style={{ textDecoration: "none" }}>
            <HeaderOption Icon={HomeIcon} title="Home" />
          </Link>

          <Link to="/Team" style={{ textDecoration: "none" }}>
            <HeaderOption Icon={GroupIcon} title="My Team" />
          </Link>

          {user.role === "Manager" || user.role === "Business Head" ? (
            <Link to="/Roadmap" style={{ textDecoration: "none" }}>
              <HeaderOption Icon={ListAltIcon} title="Skill Roadmap" />
            </Link>
          ) : (
            ""
          )}

          <Link to="/Skills" style={{ textDecoration: "none" }}>
            <HeaderOption Icon={SchoolIcon} title="Team Skills" />
          </Link>
          {user.role === "Business Head" ? (
            <Link to="/Trends" style={{ textDecoration: "none" }}>
              <HeaderOption Icon={StackedBarChartIcon} title="Trends" />
            </Link>
          ) : (
            ""
          )}
          <div class="vl"></div>

          <Link
            to="/Logout"
            style={{ textDecoration: "none" }}
            onClick={logout}
          >
            <HeaderOption Icon={LogoutIcon} title="Logout" />
          </Link>
        </div>
      ))}
    </>
  );

  useEffect(() => {
    getLoggedInDetails();
  }, []);

  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://2bbgsa3qmesj4chqra8hhkbg-wpengine.netdna-ssl.com/wp-content/uploads/2021/04/logo.svg"
          alt="Image"
        />
      </div>
      {props.auth.isLoggedIn ? userLinks() : guestLinks()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
