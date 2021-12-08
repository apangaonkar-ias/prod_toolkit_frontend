import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import "./RegisterUser.css";
import { useForm, Form } from "../useForm";
import Controls from "../Controls/Controls";
import Select from "../Controls/Select";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Notification from "../Notification";
import { fetchUsers, updateUser, saveUsers } from "../Services/index";

const initialFValues = {
  employee_name: "",
  team: "",
  designation: "",
  role: "",
  email: "",
  org_level: "",
  certifications: "",
  projects: "",
  department: "",
  hireDate: new Date(),
  total_exp: 0.0,
  ad_tech_exp: 0.0,
  slack_time: 0.0,
};

function RegisterUser(props) {
  const { recordForEdit, openPopup, setOpenPopup, fetchUsers } = props;

  const [employee_name, set_employee_name] = useState("");

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
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("department" in fieldValues)
      temp.department =
        fieldValues.department.length != 0 ? "" : "This field is required.";
    if ("org_level" in fieldValues) {
      temp.org_level = fieldValues.org_level ? "" : "This field is required";
    }
    if ("total_exp" in fieldValues) {
      temp.total_exp = fieldValues.total_exp ? "" : "This field is required";
    }
    if ("ad_tech_exp" in fieldValues) {
      temp.ad_tech_exp = fieldValues.ad_tech_exp
        ? ""
        : "This field is required";
    }
    if ("slack_time" in fieldValues) {
      temp.slack_time = fieldValues.slack_time ? "" : "This field is required";
    }
    if ("designation" in fieldValues) {
      temp.designation = fieldValues.designation
        ? ""
        : "This field is required";
    }
    if ("role" in fieldValues) {
      temp.role = fieldValues.role ? "" : "This field is required";
    }
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleEdit = (e) => {
    e.preventDefault();
    console.log("Handling Edit funtionality");

    var postData = new FormData();

    postData.append("employee_name", values.employee_name);
    postData.append("team", values.team);
    postData.append("email", values.email);
    postData.append("department", values.department);
    postData.append("org_level", values.org_level);
    postData.append("total_exp", values.total_exp);
    postData.append("ad_tech_exp", values.ad_tech_exp);
    postData.append("slack_time", values.slack_time);
    postData.append("designation", values.designation);
    postData.append("role", values.role);
    postData.append("certifications", values.certifications);
    postData.append("projects", values.projects);
    postData.append("hireDate", values.hireDate);
    console.log(employee_name);

    for (var pair of postData.entries()) {
      console.log(pair[0] + " " + pair[1]);
    }

    console.log("Put ke andar ho sir");

    // props.updateUser(postData, values.e_id);
    // props.findAllUsers();

    // redux call, pass postData & values.e_id
    var config = {
      method: "put",
      url: "http://localhost:8080/toolkit/updateEmp/" + values.e_id,
      data: postData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.jwtToken}`,
      },
    };

    console.log(config.data);

    axios(config);

    // console.log(openPopup);

    setNotify({
      isOpen: true,
      message: "Submitted Succesfully",
      type: "success",
    });
    setOpenPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("In handle Submit");
    if (validate()) {
      var postData = new FormData();

      postData.append("employee_name", values.employee_name);
      postData.append("team", values.team);
      postData.append("email", values.email);
      postData.append("department", values.department);
      postData.append("org_level", values.org_level);
      postData.append("total_exp", values.total_exp);
      postData.append("ad_tech_exp", values.ad_tech_exp);
      postData.append("slack_time", values.slack_time);
      postData.append("designation", values.designation);
      postData.append("role", values.role);
      postData.append("certifications", values.certifications);
      postData.append("projects", values.projects);
      postData.append("hireDate", values.hireDate);

      console.log("Inside Add");
      console.log(postData);

      for (var pair of postData.entries()) {
        console.log(pair[0] + " " + pair[1]);
      }

      // props.saveUsers(postData);

      var config = {
        method: "post",
        url: "http://localhost:8080/toolkit/addEmp",
        data: postData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.jwtToken}`,
        },
      };

      axios(config);

      setValues(initialFValues);
      setOpenPopup(false);
      fetchUsers();
      setNotify({
        isOpen: true,
        message: "Submitted Succesfully",
        type: "success",
      });
    }
  };

  useEffect(() => {
    props.findAllUsers();
    // props.fetchUsers();
  }, [openPopup]);

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
      {/* <Header /> */}
      <div className="app__body">
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
                label="Email"
                name="email"
                // value= {recordForEdit=== null ? email : values.email}
                value={values.email}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={handleInputChange}
                error={errors.email}
              />
              {/* <Controls.Select
            name="department"
            value= {recordForEdit=== null ? department : values.department}
            
            label="Department"
            onChange={(e) => setdepartment(e.target.value)}
            options={employeeService.getDepartmentCollection()}
            error={errors.department}
          /> */}
              <Controls.Input
                label="Department"
                name="department"
                // value= {recordForEdit=== null ? department : values.department}
                value={values.department}
                errors={errors.department}
                // onChange={(e) => setdepartment(e.target.value)}
                onChange={handleInputChange}
              />
              <Controls.Input
                label="Organisation Level"
                name="org_level"
                // value= {recordForEdit=== null ? org_level : values.org_level}
                value={values.org_level}
                // onChange={(e) => setOrg_level(e.target.value)}
                onChange={handleInputChange}
                error={errors.org_level}
              />{" "}
              <Controls.Input
                label="Total Experience"
                name="total_exp"
                // value= {recordForEdit=== null ? total_exp : values.total_exp}
                // onChange={(e) => setTotal_exp(e.target.value)}
                value={values.total_exp}
                onChange={handleInputChange}
                error={errors.total_exp}
              />
              <Controls.Input
                label="Ad Tech Experience"
                name="ad_tech_exp"
                // value= {recordForEdit=== null ? ad_tech_exp : values.ad_tech_exp}
                value={values.ad_tech_exp}
                // onChange={(e) => setAd_tech_exp(e.target.value)}
                onChange={handleInputChange}
                error={errors.ad_tech_exp}
              />
              <Controls.Input
                label="Slack Time"
                name="slack_time"
                // value= {recordForEdit=== null ? slack_time : values.slack_time}
                value={values.slack_time}
                // onChange={(e) => setSlack_time(e.target.value)}
                onChange={handleInputChange}
                error={errors.slack_time}
              />
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                label="Designation"
                name="designation"
                // value= {recordForEdit=== null ? designation : values.designation}
                value={values.designation}
                // onChange={(e) => setDesignation(e.target.value)}
                onChange={handleInputChange}
                error={errors.designation}
              />{" "}
              <Controls.Input
                label="Team"
                name="team"
                // value= {recordForEdit=== null ? team : values.team}
                value={values.team}
                onChange={handleInputChange}
                error={errors.team}
              />
              <Controls.Input
                label="Role"
                name="role"
                // value= {recordForEdit=== null ? role : values.role}
                value={values.role}
                // onChange={(e) => setRole(e.target.value)}
                onChange={handleInputChange}
                error={errors.role}
              />
              <Controls.Input
                label="Certifications"
                name="certifications"
                // value= {recordForEdit=== null ? certifications : values.certifications}
                value={values.certifications}
                // onChange={(e) => setCertifications(e.target.value)}
                onChange={handleInputChange}
              />
              <Controls.Input
                label="Projects"
                name="projects"
                //value={recordForEdit === null ? projects : values.projects}
                value={values.projects}
                // onChange={(e) => setProjects(e.target.value)}
                onChange={handleInputChange}
              />
              <Controls.DatePicker
                name="hireDate"
                label="Hire Date"
                // value= {recordForEdit=== null ? hireDate : values.hireDate}
                value={values.hireDate}
                // onChange={(e) => sethireDate(e.target.value)}
                onChange={handleInputChange}
                error={errors.hireDate}
              />
              {/* {recordForEdit === null && (
                <Controls.Input
                  label="Set Password"
                  name="password"
                  // value={recordForEdit === null ? password : values.password}
                  value={values.password}
                  // onChange={(e) => setProjects(e.target.value)}
                  onChange={handleInputChange}
                />
              )} */}
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

        {/* <Popup
          title="Employee Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <RegisterUser recordForEdit={recordForEdit} />
        </Popup> */}

        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user, //fetchAllUsers
    updatedUser: state.user,
    savedUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    updateUser: (postData, e_id) => dispatch(updateUser(postData, e_id)),
    saveUsers: (postData) => dispatch(saveUsers(postData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
