import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Popup from "../Popup";
import SkillRegister1 from "../SkillRegisterPage/SkillRegister1";
import { connect } from "react-redux";
import { getLoginUser } from "../Services/index";
import axios from "axios";

function Sidebar(props) {
  let user = [];
  let skill = [];
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);

  const getLoggedInDetailsSkills = () => {
    var config = {
      method: "get",
      url: "http://localhost:8080/toolkit/getSkillDetails",
      headers: {
        Authorization: `Bearer ${localStorage.jwtToken}`,
      },
    };

    axios(config)
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        // console.log(data[0].employee_name);
        skill = data;

        setSkills(skill);
      });
  };
  // console.log(skills);

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
        // console.log(data);
        // console.log(data[0].employee_name);
        user = data;
        // console.log(user);
        setUsers(data);
      });
  };
  // console.log(users);

  const currentUsers = users.slice();
  // console.log(currentUsers);

  const currentSkills = skills.slice();
  // console.log(currentSkills[0].e_id);

  useEffect(() => {
    getLoggedInDetails();
    getLoggedInDetailsSkills();
  }, []);

  return (
    <>
      <div className="sidebar">
        {currentUsers.map((user) => (
          <div key={user.e_id}>
            <div className="sidebar__top">
              <img
                src="https://t4.ftcdn.net/jpg/04/37/40/57/360_F_437405726_kV9oEWWC1NTKb7gpm5HyXcAx6S0oS1m2.jpg"
                alt=""
              />
              <Avatar className="sidebar__avatar" />

              <h2> {user.employee_name}</h2>

              <h4>{user.email}</h4>
            </div>
            <div className="sidebar__profile">
              <div className="sidebar__profile__details">
                <p>Department</p>
                <p className="sidebar__profile__value">{user.department}</p>
              </div>
              <div className="sidebar__profile__details">
                <p>Role</p>
                <p className="sidebar__profile__value">{user.role}</p>
              </div>
              <div className="sidebar__profile__details">
                <p>Org Level</p>
                <p className="sidebar__profile__value">{user.org_level}</p>
              </div>
              <div className="sidebar__profile__details">
                <p>Team</p>
                <p className="sidebar__profile__value">{user.team}</p>
              </div>
              <div className="sidebar__profile__details">
                <p>Total Experience</p>
                <p className="sidebar__profile__value">{user.total_exp}</p>
              </div>
              <div className="sidebar__profile__details">
                <p>AdTech Experience</p>
                <p className="sidebar__profile__value">{user.ad_tech_exp}</p>
              </div>
              <div className="sidebar__profile__details">
                <p>Certifications</p>
                <p className="sidebar__profile__value">{user.certifications}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="sidebar__bottom">
          {currentSkills.map((skill) => (
            <div key={skill.e_id}>
              <div style={{ marginLeft: "95px" }}>
                <h3>Your Skills </h3>
              </div>
              {/* <HeaderOption Icon={EditIcon} title="Edit" /> */}
              {/* </div> */}

              <div className="sidebar__skills">
                <p>{skill.p_skills}</p>
                <p className="sidebar__profile__value">
                  {skill.p_manager_rating <= 3
                    ? "BEGINEER"
                    : skill.p_manager_rating <= 7 && skill.p_manager_rating > 3
                    ? "INTERMEDIATE"
                    : skill.p_manager_rating > 7
                    ? "EXPERT"
                    : ""}
                </p>
              </div>

              <div className="sidebar__skills">
                <p>{skill.a_skills}</p>
                <p className="sidebar__profile__value">
                  {skill.a_self_rating <= 3
                    ? "BEGINNER"
                    : skill.a_self_rating <= 7 && skill.a_self_rating > 3
                    ? "INTERMEDIATE"
                    : skill.a_self_rating > 7
                    ? "EXPERT"
                    : ""}
                </p>
              </div>
              <hr
                style={{
                  marginTop: "11px",
                  height: "1px",
                  backgroundColor: "#ccc",
                  border: "none",
                }}
              />

              <div className="sidebar__skills">
                <p style={{ color: "black", fontSize: "14px" }}>Rating Delta</p>
                <p
                  className="sidebar__profile__value"
                  style={{ fontSize: "14px" }}
                >
                  {skill.p_rating_delta}
                </p>
              </div>

              {/* <Controls.Button
                text="Manage Your Skills"
                variant="outlined"
                startIcon={<EditIcon />}
                style={{ marginLeft: "12%", marginTop: "15px" }}
                onClick={() => {
                  console.log("in on click");
                  setOpenPopup(true);

                  // setRecordForEdit(null)
                }}
              /> */}
            </div>
          ))}
          <Popup
            title="Manage Your Skills"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            {/* <RegisterUser recordForEdit={recordForEdit} addOrEdit={addOrEdit} /> */}
            <SkillRegister1 />
          </Popup>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLoginUser: () => dispatch(getLoginUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
