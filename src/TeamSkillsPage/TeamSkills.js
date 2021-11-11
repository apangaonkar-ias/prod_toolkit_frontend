import React, { Component } from "react";
import teamSkillImage from "../images/skills.jpg";
import Widgets from "../Widgets/Widgets";
import "./TeamSkills.css";
import axios from "axios";
import { ConstructionRounded } from "@mui/icons-material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { render } from "@testing-library/react";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import PageHeader from "../PageHeader/PageHeader";

export default class TeamSkills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      currentPage: 1,
      usersPerPage: 5,
    };
  }

  componentDidMount() {
    this.findAllUsers_Skills();
  }

  findAllUsers_Skills() {
    axios
      .get("http://localhost:8080/toolkit/home2")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ skills: data });
        console.log(data);
      });
      
  }
  handleKeywordKeyPress = (e) => {
    if (e.key == "Enter" && e.target.value) {
      let x = e.target.value;
      if (typeof e.target.value == "string") {
        x = parseInt(e.target.value);
      }
      this.setState({
        [e.target.name]: x,
      });
    }
  };

  changePage = (e) => {
    let x = e.target.value;

    if (typeof x == "string" && x) {
      x = parseInt(x);
    }

    this.setState({
      [e.target.name]: x,
    });
  };

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  lastPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.skills.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.skills.length / this.state.usersPerPage
        ),
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.skills.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {

    const { skills, currentPage, usersPerPage } = this.state;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = skills.slice(firstIndex, lastIndex);
    const totalPages = skills.length / usersPerPage;

    return (
      <div className="TeamTable">
        <PageHeader title="Team Skills Page" subtitle="Check skills your team possesses" />
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 500 }} aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Primary Skills (P.S.)
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  P.S. Self Rating
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  P.S. Manager Rating
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  P.S. Proficiency Level
                </TableCell>
                <TableCell
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  P.S. Rating Delta
                </TableCell>

                <TableCell
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Additional Skills (A.S.)
                </TableCell>
                {/* <TableCell
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Aspired Skills
                </TableCell> */}

                <TableCell
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  A.S. Self Rating
                </TableCell>

                <TableCell
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  A.S. Proficiency Level
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.map((skill) => (
                <TableRow
                  key={skill.e_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {skill.employee_name}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }} align="center">
                    {skill.p_skills}
                  </TableCell>
                  <TableCell align="center">{skill.p_self_rating}</TableCell>
                  <TableCell align="center">{skill.p_manager_rating}</TableCell>
                  <TableCell align="center">
                    {skill.p_proficiency_level}
                  </TableCell>
                  <TableCell align="center">{skill.p_rating_delta}</TableCell>
                  <TableCell align="center">{skill.a_skills}</TableCell>

                  <TableCell align="center">{skill.a_self_rating}</TableCell>

                  <TableCell align="center">
                    {skill.a_proficiency_level}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="tableFooter">
            <div className="footerLeft">
              <h4>
                Showing Page {currentPage} of {totalPages}
              </h4>
            </div>
            <div className="footerRight">
              <FormGroup
                row
                className="formGroupStyle"
                style={{ padding: "14px", float: "right" }}
              >
                <FormGroup row>
                  <Button
                    className="buttonStyle"
                    variant="outlined"
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.firstPage}
                  >
                    <FirstPageIcon /> First
                  </Button>
                  <Button
                    className="buttonStyle"
                    variant="outlined"
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.prevPage}
                  >
                    <NavigateBeforeIcon />
                    Previous
                  </Button>
                </FormGroup>
                <div>
                  <TextField
                    id="filled-basic"
                    //label="Page"
                    variant="outlined"
                    className="pageField"
                    name="currentPage"
                    value={currentPage}
                    onChange={this.changePage}
                  />
                </div>
                <FormGroup row>
                  <Button
                    className="buttonStyle"
                    variant="outlined"
                    disabled={currentPage === totalPages ? true : false}
                    onClick={this.nextPage}
                  >
                    Next <NavigateNextIcon />
                  </Button>
                  <Button
                    className="buttonStyle"
                    variant="outlined"
                    disabled={currentPage === totalPages ? true : false}
                    onClick={this.lastPage}
                  >
                    Last <LastPageIcon />
                  </Button>
                </FormGroup>
              </FormGroup>
            </div>
          </div>

        </TableContainer>
        <Paper
            elevation={2}
            square
            style={{ textAlign: "center", height: "400px" }}
          >
            <h3 style={{ paddingTop: "180px" }}>Looker Representation</h3>
          </Paper>
      </div>
    );
  }
}
