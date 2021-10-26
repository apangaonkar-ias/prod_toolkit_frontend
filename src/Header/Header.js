import React from "react";
import "./Header.css";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import {Link} from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="header__left">
     

        <img
          src="https://2bbgsa3qmesj4chqra8hhkbg-wpengine.netdna-ssl.com/wp-content/uploads/2021/04/logo.svg"
          alt="Image"
        />
     
      </div>

      <div className="header__right">
        <Link to ='/home' style={{textDecoration:'none'}}>
        <HeaderOption Icon={HomeIcon} title="Home" />
        </Link>
        <Link to='/Team' style={{textDecoration:'none'}}>
        <HeaderOption Icon={GroupIcon} title="My Team" />
        </Link>
        <Link to = '/Projects' style={{textDecoration:'none'}}>
        <HeaderOption Icon={ListAltIcon} title="My Projects" />
        </Link>
        <Link to ='/Skills' style={{textDecoration:'none'}}>
        <HeaderOption Icon={SchoolIcon} title="Team Skills" />
        </Link>
        <Link to = 'Trends' style={{textDecoration:'none'}}>
        <HeaderOption Icon={StackedBarChartIcon} title="Trends" />
        </Link>

        <div class="vl"></div>

        
        <HeaderOption
          avatar="https://www.kindpng.com/picc/m/136-1369892_avatar-people-person-business-user-man-character-avatar.png"
          title="me"
        />
        <HeaderOption Icon={LogoutIcon} title="Logout" />
      </div>
    </div>
  );
}

export default Header;
