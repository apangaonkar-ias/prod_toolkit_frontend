import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import "./RegisterUser.css";
import { useForm, Form } from "../useForm";
import Controls from "../Controls/Controls";
import Select from "../Controls/Select";

import { getDepartmentCollection } from "../Services/employeeService";

const LocationGroupItems = [
  { id: "Pune", title: "Pune" },
  { id: "Remote", title: "Remote" },
];

const initialFieldValues = {
  e_id: 1,
  team: "",
  location: "",
  designation: "",
  role: "",
  employee_name: "",
  email: "",
  departmentId: "",
  org_level: "",
  certifications: "",
  projects: "",
  hireDate: new Date(),
  total_exp: 0.0,
  ad_tech_exp: 0.0,
  slack_time: 0.0,
};

export default function RegisterUser() {
  const validate = () => {
    let temp = {};
    temp.employee_name = values.employee_name ? "" : "This field is required";
    temp.email = /$^|.+@.+..+/.test(values.email)
      ? ""
      : "Email format not valid";
    temp.departmentId = values.departmentId ? "" : "This field is required";
    temp.org_level = values.org_level ? "" : "This field is required";
    temp.total_exp = values.total_exp ? "" : "This field is required";
    temp.ad_tech_exp = values.ad_tech_exp ? "" : "This field is required";
    temp.slack_time = values.slack_time ? "" : "This field is required";
    temp.designation = values.designation ? "" : "This field is required";
    temp.role = values.role ? "" : "This field is required";
    temp.designation = values.designation ? "" : "This field is required";

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x == ""); // if there is nothing entered in form, it should not validate on submit
    //returns boolean values
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) window.alert("testing...");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="Employee Name"
            name="employee_name"
            value={values.employee_name}
            onChange={handleInputChange}
            error={errors.employee_name}
          />

          <Controls.Input
            label="Email ID"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />

          <Controls.Select
            name="departmentId"
            value={values.departmentId}
            label="Department"
            onChange={handleInputChange}
            options={getDepartmentCollection()}
            error={errors.departmentId}
          />

          <Controls.Input
            label="Organisation Level"
            name="org_level"
            value={values.org_level}
            onChange={handleInputChange}
          />

          <Controls.DatePicker
            label="Hire Date"
            name="hireDate"
            value={values.hireDate}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="Total Experience"
            name="total_exp"
            value={values.total_exp}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="Slack Time"
            name="slack_time"
            value={values.slack_time}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            row
            name="location"
            label="Location"
            value={values.location}
            onChange={handleInputChange}
            items={LocationGroupItems}
          />

          <Controls.Input
            label="Designation"
            name="designation"
            value={values.designation}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="Organisation Level"
            name="org_level"
            value={values.org_level}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="Role"
            name="role"
            value={values.role}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="Certifications"
            name="certifications"
            value={values.certifications}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="Projects"
            name="projects"
            value={values.projects}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="Ad Tech Experience"
            name="ad_tech_exp"
            value={values.ad_tech_exp}
            onChange={handleInputChange}
          />

          <div>
            <Controls.Button
              variant="contained"
              color="primary"
              size="large"
              text="Submit"
              type="submit"
            />

            <Controls.Button
              variant="contained"
              color="default"
              size="large"
              text="Reset"
              type="reset"
              onClick={resetForm}
              style={{ margin: "5px" }}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
