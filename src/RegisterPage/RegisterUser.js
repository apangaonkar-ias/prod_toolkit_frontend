import React, { useState, useEffect } from "react";
// import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import "./RegisterUser.css";
import { useForm, Form } from "../useForm";
import Controls from "../Controls/Controls";
import Select from "../Controls/Select";

import { Grid } from "@material-ui/core";
// import Controls from "../../components/controls/Controls";
// import { useForm, Form } from "../../components/useForm";
import * as employeeService from "../Services/employeeService";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const initialFValues = {
  e_id: 0,
  employee_name: "",
  team: "",
  location: "",
  designation: "",
  role: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  org_level: "",
  certifications: "",
  projects: "",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
  total_exp: 0.0,
  ad_tech_exp: 0.0,
  slack_time: 0.0,
};

export default function RegisterUser() {
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
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length != 0 ? "" : "This field is required.";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      employeeService.insertEmployee(values);
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="employee_name"
            label="Full Name"
            value={values.employee_name}
            onChange={handleInputChange}
            error={errors.employee_name}
          />
          <Controls.Input
            label="Email"
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
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
          <Controls.Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            label="Organisation Level"
            name="org_level"
            value={values.org_level}
            onChange={handleInputChange}
            error={errors.org_level}
          />{" "}
          <Controls.Input
            label="Total Experience"
            name="total_exp"
            value={values.total_exp}
            onChange={handleInputChange}
            error={errors.total_exp}
          />
          <Controls.Input
            label="Ad Tech Experience"
            name="ad_tech_exp"
            value={values.ad_tech_exp}
            onChange={handleInputChange}
            error={errors.ad_tech_exp}
          />
          <Controls.Input
            label="Slack Time"
            name="slack_time"
            value={values.slack_time}
            onChange={handleInputChange}
            error={errors.slack_time}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
            error={errors.gender}
          />
          <Controls.Input
            label="Designation"
            name="designation"
            value={values.designation}
            onChange={handleInputChange}
            error={errors.designation}
          />{" "}
          <Controls.Input
            label="Role"
            name="role"
            value={values.role}
            onChange={handleInputChange}
            error={errors.role}
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
          <Controls.DatePicker
            name="hireDate"
            label="Hire Date"
            value={values.hireDate}
            onChange={handleInputChange}
            error={errors.hireDate}
          />
          <Controls.Checkbox
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
