import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useForm, Form } from "../useForm";
import Controls from "../Controls/Controls";
import Select from "../Controls/Select";
import axios from "axios";
import { Grid } from "@material-ui/core";

import MyTeam1 from "../MyTeamPage/MyTeam1";
import Popup from "../Popup";
import PrimarySkill from "./PrimarySkill";

import Notification from "../Notification";
import { connect } from "react-redux";
// import { fetchSkills, updateSkills } from "../Services";
import { fetchSkills, updateSkill } from "../Services/index";

const initialFValues = {
  employee_name: "",
};

function SkillRegisterPage(props) {
  const { recordForEdit, openPopup, setOpenPopup } = props;

  const [employee_name, set_employee_name] = useState("");

  // const [openPopup, setOpenPopup] = useState(false);

  const skillsData = props.skillsData;
  console.log(props.skillsData);
  const skills = skillsData.skills;

  const [flag, setFlag] = useState(-1);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("employee_name" in fieldValues)
      temp.employee_name = fieldValues.employee_name
        ? ""
        : "This field is required.";
    if ("p_skills" in fieldValues)
      temp.p_skills =
        fieldValues.p_skills.length != 0 ? "" : "This field is required.";
    if ("p_self_rating" in fieldValues) {
      temp.p_self_rating = fieldValues.p_self_rating
        ? ""
        : "This field is required";
    }
    if ("p_manager_rating" in fieldValues) {
      temp.p_manager_rating = fieldValues.p_manager_rating
        ? ""
        : "This field is required";
    }
    if ("p_proficiency_level" in fieldValues) {
      temp.p_proficiency_level = fieldValues.p_proficiency_level
        ? ""
        : "This field is required";
    }
    if ("p_rating_delta" in fieldValues) {
      temp.p_rating_delta = fieldValues.p_rating_delta
        ? ""
        : "This field is required";
    }
    if ("a_skills" in fieldValues) {
      temp.a_skills = fieldValues.a_skills ? "" : "This field is required";
    }
    if ("a_self_rating" in fieldValues) {
      temp.a_self_rating = fieldValues.a_self_rating
        ? ""
        : "This field is required";
    }
    if ("comments" in fieldValues) {
      temp.comments = fieldValues.comments ? "" : "This field is required";
    }
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  // const findAllUsers = MyTeam1();

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("Handling Edit funtionality");

    var postData = new FormData();

    postData.append("employee_name", values.employee_name);
    postData.append("team", values.team);
    postData.append("p_skills", values.p_skills);
    postData.append("p_self_rating", values.p_self_rating);
    postData.append("p_manager_rating", values.p_manager_rating);
    postData.append("p_proficiency_level", values.p_proficiency_level);
    postData.append("p_rating_delta", values.p_rating_delta);
    postData.append("a_skills", values.a_skills);
    postData.append("a_self_rating", values.a_self_rating);

    console.log(employee_name);

    for (var pair of postData.entries()) {
      console.log(pair[0] + " " + pair[1]);
    }

    console.log("Put ke andar ho sir");

    // props.updateSkill(postData, values.e_id);
    console.log("crossed updateskills");
    const headers = {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.jwtToken}`,
    };

    var config = {
      method: "put",
      url: "http://localhost:8080/toolkit/updateUserSkills/" + values.e_id,
      data: postData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.jwtToken}`,
      },
    };

    // console.log(config.data);
    console.log("Put ke andar ho sir");

    axios(config);

    setOpenPopup(false);

    // console.log("Put ke andar ho sir");

    setNotify({
      isOpen: true,
      message: "Submitted Succesfully",
      type: "success",
    });

    setOpenPopup(false);
  };

  useEffect(() => {
    props.findAllUsers_Skills();
    // props.fetchSkills();
  }, [openPopup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("In handle Submit");
    //   if (validate()) {
    //     var postData = new FormData();

    //     postData.append("employee_name", values.employee_name);
    //     postData.append("p_skills", values.p_skills);
    //     postData.append("p_self_rating", values.p_self_rating);
    //     postData.append("p_manager_rating", values.p_manager_rating);
    //     postData.append("p_proficiency_level", values.p_proficiency_level);
    //     postData.append("p_rating_delta", values.p_rating_delta);
    //     postData.append("a_skills", values.a_skills);
    //     postData.append("a_self_rating", values.a_self_rating);

    //     console.log("Inside Add");
    //     console.log(postData);

    //     for (var pair of postData.entries()) {
    //       console.log(pair[0] + " " + pair[1]);
    //     }

    //     var config = {
    //       method: "post",
    //       url: "http://localhost:8080/toolkit/addUserSkills",
    //       data: postData,
    //       headers: { "Content-Type": "multipart/form-data" },
    //     };
    //     axios(config);

    //     // console.log(data);
    //     setValues(initialFValues);
    //     setOpenPopup(false);
    //     setNotify({
    //       isOpen: true,
    //       message: "Submitted Succesfully",
    //       type: "success",
    //     });
    //   }
  };

  useEffect(() => {
    console.log("Inside Useeffect");
    console.log(recordForEdit);
    if (recordForEdit != null) {
      setFlag(1);
      setValues({
        ...recordForEdit,
      });
    }
  }, [recordForEdit]);

  return (
    <>
      <Form>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              name="employee_name"
              label="Full Name"
              // value= {recordForEdit === null ? employee_name : values.employee_name}
              value={values.employee_name}
              // onChange={(e) => set_employee_name(e.target.value)}
              onChange={handleInputChange}
              error={errors.employee_name}
            />
            <Controls.Input
              label="Primary Skills"
              name="p_skills"
              // value= {recordForEdit=== null ? p_skills : values.p_skills}
              value={values.p_skills}
              errors={errors.p_skills}
              // onChange={(e) => setp_skills(e.target.value)}
              onChange={handleInputChange}
            />
            <Controls.Input
              label="Primary Skill Self Rating"
              name="p_self_rating"
              // value= {recordForEdit=== null ? p_self_rating : values.p_self_rating}
              value={values.p_self_rating}
              // onChange={(e) => setp_self_rating(e.target.value)}
              onChange={handleInputChange}
              error={errors.p_self_rating}
            />{" "}
            <Controls.Input
              label="Primary Skill Manager Rating"
              name="p_manager_rating"
              // value= {recordForEdit=== null ? p_manager_rating : values.p_manager_rating}
              // onChange={(e) => setp_manager_rating(e.target.value)}
              value={values.p_manager_rating}
              onChange={handleInputChange}
              error={errors.p_manager_rating}
            />
            <Controls.Input
              label="Comments"
              name="comments"
              // value= {recordForEdit=== null ? a_skills : values.a_skills}
              value={values.comments}
              // onChange={(e) => seta_skills(e.target.value)}
              onChange={handleInputChange}
              error={errors.comments}
            />{" "}
          </Grid>
          <Grid item xs={6}>
            <Controls.Input
              label="Primary Skill Proficiency Level"
              name="p_proficiency_level"
              // value= {recordForEdit=== null ? p_proficiency_level : values.p_proficiency_level}
              value={values.p_proficiency_level}
              // onChange={(e) => setp_proficiency_level(e.target.value)}
              onChange={handleInputChange}
              error={errors.p_proficiency_level}
            />
            <Controls.Input
              label="Manager VS Self Rating Delta"
              name="p_rating_delta"
              // value= {recordForEdit=== null ? p_rating_delta : values.p_rating_delta}
              value={values.p_rating_delta}
              // onChange={(e) => setp_rating_delta(e.target.value)}
              onChange={handleInputChange}
              error={errors.p_rating_delta}
            />
            <Controls.Input
              label="Aspired Skill"
              name="a_skills"
              // value= {recordForEdit=== null ? a_skills : values.a_skills}
              value={values.a_skills}
              // onChange={(e) => seta_skills(e.target.value)}
              onChange={handleInputChange}
              error={errors.a_skills}
            />{" "}
            <Controls.Input
              label="Aspired Skill Self Rating"
              name="a_self_rating"
              // value= {recordForEdit=== null ? a_self_rating : values.a_self_rating}
              value={values.a_self_rating}
              // onChange={(e) => seta_self_rating(e.target.value)}
              onChange={handleInputChange}
              error={errors.a_self_rating}
            />
            <div>
              <Controls.Button
                type="submit"
                text={flag === -1 ? "Add User" : "Update User"}
                onClick={flag === -1 ? handleSubmit : handleEdit}
              />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm}
              />
            </div>
          </Grid>
        </Grid>
      </Form>

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    skillsData: state.skill,
    updatedSkill: state.skill,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSkills: () => dispatch(fetchSkills()),
    updateSkill: (postData, e_id) => dispatch(updateSkill(postData, e_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillRegisterPage);

// const mapStateToProps = (state) => {
//   return {
//     skillsObject: state.skill,
//     updatedSkillObject: state.skill,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchSkills: () => dispatch(fetchSkills()),
//     updateSkills: (postData, e_id) => dispatch(updateSkills(postData, e_id)),
//   };
// };

// const mapStateToProps = (state) => {
//   return {
//     skillsData: state.skill, //fetchAllSkills
//     updatedSkill: state.skill,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchSkills: () => dispatch(fetchSkills()),
//     updateSkills: (postData, e_id) => dispatch(updateSkills(postData, e_id)),
//   };
// };

// export default connect(mapDispatchToProps, mapStateToProps)(SkillRegisterPage);
// export default SkillRegisterPage;
