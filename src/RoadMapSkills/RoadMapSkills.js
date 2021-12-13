import React, { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { useForm, Form } from "../useForm";
import Controls from "../Controls/Controls";
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
import { connect } from "react-redux";
import { roadmapSkillUsersFetch } from "../Services/index";

const initialFValues = {
  required_skill: "",
  min_req_rating: "",
  complexity: "",
  no_of_emp: "",
};

const handleSubmit = () => {};

const handleEdit = () => {};

function RoadMapSkills(props) {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  // const [users, setUsers] = useState([]);
  // const [userArray, setUserArray] = useState([]);

  const [response, setResponse] = useState([]);

  const [userArray, setUserArray] = useState([]);
  let users = [];
  // let userArray = [];

  const [flag, setFlag] = useState(-1);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("required_skill" in fieldValues)
      temp.required_skill = fieldValues.required_skill
        ? ""
        : "This field is required.";

    if ("min_req_rating" in fieldValues)
      temp.min_req_rating = fieldValues.min_req_rating
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("In handle Submit");
    if (validate()) {
      var postData = new FormData();

      postData.append("required_skill", values.required_skill);
      postData.append("min_req_rating", values.min_req_rating);
      postData.append("complexity", values.complexity);

      console.log("Inside Add");
      console.log(postData);

      for (var pair of postData.entries()) {
        console.log(pair[0] + " " + pair[1]);
      }

      var config = {
        method: "post",
        url: "http://localhost:8080/toolkit/validateSkillRoadmap",
        data: postData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.jwtToken}`,
        },
      };

      axios(config)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          doSomething(data);

          // setUsers(Object.values(data));
          // // let userArray = [];
          // console.log(users);
          // console.log(userArray);
          // setUsers(userArray);
          // console.log(users);
        });

      // setUsers(Object.values(response));

      // for (let i = 0; i < users.length; i++) {
      //   var user = users[i].split(",");
      //   userArray.push({ key: i, value: user });
      //   console.log(user);
      // }

      // console.log(userArray);
      // setUserArray(userArray);

      // setValues(initialFValues);

      setNotify({
        isOpen: true,
        message: "Searching..",
        type: "success",
      });
    }
  };

  const doSomething = (data) => {
    console.log("In here");
    console.log(data);
    users = Object.values(data);
    // setUsers(Object.values(data));
    // let userArray = [];
    console.log(users);
    for (let i = 0; i < users.length; i++) {
      var user = users[i].split(",");
      userArray.push({ key: i, value: user });
      console.log(user);
    }

    console.log(userArray);

    // console.log(userArray.value[1]);
    setUserArray(userArray);
  };

  // useEffect(() => {
  //   // console.log("IN useEffect");
  // }, [userArray, users]);

  const handleresetForm = (e) => {
    e.preventDefault();
    // setUserArray([]);
    users = [];
    setUserArray([]);
    // setUsers([]);
  };

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
                    value={values.required_skill}
                    onChange={handleInputChange}
                    error={errors.required_skill}
                  />
                  <Controls.Input
                    label="Minimum Skill Rating Required"
                    name="min_req_rating"
                    value={values.min_req_rating}
                    onChange={handleInputChange}
                    error={errors.min_req_rating}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controls.Input
                    label="Complexity (Minimum hours/week)"
                    name="complexity"
                    value={values.complexity}
                    onChange={handleInputChange}
                    error={errors.complexity}
                  />{" "}
                  <Controls.Input
                    label="Number of Employees required"
                    name="no_of_emp"
                    value={values.no_of_emp}
                    onChange={handleInputChange}
                    error={errors.no_of_emp}
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
                      onClick={handleresetForm}
                    />
                  </div>
                </Grid>
              </Grid>
            </Form>
          </TableContainer>

          <TableContainer component={Paper}>
            <div
              className="flex-container"
              style={{ border: "1px solid #ccc", borderRadius: "10px" }}
            >
              <h3
                style={{
                  textAlign: "center",
                  fontFamily: "courier",
                  marginBottom: "13px",
                }}
              >
                Results
              </h3>
              <div className="flex__div">
                <p style={{ fontFamily: "courier", textAlign: "center" }}>
                  <i> {userArray.length} employees meeting your requirement </i>
                </p>{" "}
                {/* <p style={{ fontFamily: "courier", textAlign: "center" }}>
                  {" "}
                  <i>
                    Expected Employees:
                    {values.no_of_emp}
                  </i>
                </p> */}
              </div>

              <div className="flex__div" style={{ marginBottom: "13px" }}>
                <p style={{ fontFamily: "courier", textAlign: "center" }}>
                  {" "}
                  <i>
                    Skill Gap:{" "}
                    {values.no_of_emp - userArray.length < 0
                      ? "No Skill Gap"
                      : +values.no_of_emp - userArray.length + " employees"}
                  </i>
                </p>
                <p style={{ fontFamily: "courier", textAlign: "center" }}>
                  <i>
                    Recommendation:{" "}
                    {values.no_of_emp - userArray.length < 0
                      ? "You have required skill set in IAS"
                      : +values.no_of_emp -
                        userArray.length +
                        " more employees need to be trained"}
                  </i>
                </p>
              </div>
            </div>

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
                    Primary Skill
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Primary Skill Rating
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Additional Skill
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

                  {/* <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Actions
                  </TableCell> */}
                </TableRow>
              </TableHead>

              <TableBody>
                {/* //here */}
                {userArray.map((user) => (
                  <TableRow
                    key={user.key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {values.no}
                      {user.value[1]}
                    </TableCell>

                    <TableCell style={{ textAlign: "center" }} align="center">
                      {user.value[3]}
                    </TableCell>
                    <TableCell align="center">{user.value[6]}</TableCell>
                    <TableCell align="center">{user.value[4]}</TableCell>
                    <TableCell align="center">
                      {/* {user.department} */}
                      {user.value[5]}
                    </TableCell>
                    <TableCell align="center">
                      {/* {user.department} */}
                      {user.value[2]}
                    </TableCell>

                    {/* <TableCell align="center">
                      <div>
                        <Controls.Button
                          type="submit"
                          text="Refer to L&D"
                          variant="outlined"
                        />
                      </div>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer />
      <Notification notify={notify} setNotify={setNotify} />
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
    // fetchUsers: () => dispatch(fetchUsers()),
    roadmapSkillUsersFetch: (postData) =>
      dispatch(roadmapSkillUsersFetch(postData)),
    // deleteUser: (userId) => dispatch(deleteUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoadMapSkills);
