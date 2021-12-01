import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { useForm, Form } from "../useForm";
import Controls from "../Controls/Controls";
import Select from "../Controls/Select";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Notification from "../Notification";
import PageHeader from "../PageHeader/PageHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";

const initialFValues = {
  required_skill: "",
  min_fskill_rating: "",
  complexity: "",
};

const handleSubmit = () => {};

const handleEdit = () => {};

function RoadMapSkills() {
  const [flag, setFlag] = useState(-1);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("required_skill" in fieldValues)
      temp.required_skill = fieldValues.required_skill
        ? ""
        : "This field is required.";

    if ("min_fskill_rating" in fieldValues)
      temp.min_fskill_rating = fieldValues.min_fskill_rating
        ? ""
        : "This field is required.";

    if ("complexity" in fieldValues)
      temp.complexity = fieldValues.complexity ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = () => {};

  const handleEdit = () => {};

  return (
    <>
      <Header />
      <div className="app__body">
        <div>
          <Sidebar />
        </div>
        <div style={{ marginLeft: "30px" }}>
          <PageHeader
            title="IAS Skill Roadmap"
            subtitle="Submit Requirements & Check IAS Preparedness"
          />
          <TableContainer component={Paper}>
            <Form>
              <Grid container>
                <Grid item xs={6}>
                  <Controls.Input
                    name="required_skill"
                    label="Future Skill"
                    // value= {recordForEdit === null ? employee_name : values.employee_name}
                    value={values.required_skill}
                    // onChange={(e) => set_employee_name(e.target.value)}
                    onChange={handleInputChange}
                    error={errors.required_skill}
                  />
                  <Controls.Input
                    label="Minimum Skill Rating Required"
                    name="min_fskill_rating"
                    // value= {recordForEdit=== null ? email : values.email}
                    value={values.min_fskill_rating}
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={handleInputChange}
                    error={errors.min_fskill_rating}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controls.Input
                    label="Complexity (Minimum hours/week)"
                    name="complexity"
                    // value= {recordForEdit=== null ? designation : values.designation}
                    value={values.complexity}
                    // onChange={(e) => setDesignation(e.target.value)}
                    onChange={handleInputChange}
                    error={errors.complexity}
                  />{" "}
                  <div>
                    <Controls.Button
                      type="submit"
                      text="Check Availibility"
                      onClick={handleSubmit}
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
          </TableContainer>
          <TableContainer component={Paper}>
            <Table aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Employee Name
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Skill
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Team
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Skill Rating
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Required Skill Rating
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Slack Time
                  </TableCell>

                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {currentUsers.map((user) => ( */}
                <TableRow
                  // key={user.e_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {/* {user.employee_name} */}Aditya
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }} align="center">
                    {/* {user.email} */}REACT
                  </TableCell>
                  <TableCell align="center">
                    {/* {user.department} */} PURE
                  </TableCell>
                  <TableCell align="center">
                    {/* {user.department} */}8
                  </TableCell>
                  <TableCell align="center">
                    {/* {user.department} */}10
                  </TableCell>
                  <TableCell align="center">
                    {/* {user.department} */}4
                  </TableCell>

                  <TableCell align="center">
                    <div>
                      <Controls.Button
                        type="submit"
                        text="Refer to L&D"
                        onClick={handleSubmit}
                        variant="outlined"
                      />
                    </div>
                  </TableCell>
                </TableRow>
                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RoadMapSkills;
