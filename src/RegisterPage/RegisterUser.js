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
    temp.employee_name = values.employee_name;
  };

  const { values, setValues, handleInputChange } = useForm(initialFieldValues);

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            label="Employee Name"
            name="employee_name"
            value={values.employee_name}
            onChange={handleInputChange}
          />

          <Controls.Input
            label="Email ID"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />

          <Controls.Select
            name="departmentId"
            value={values.departmentId}
            label="Department"
            onChange={handleInputChange}
            options={getDepartmentCollection()}
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
              style={{ margin: "5px" }}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
