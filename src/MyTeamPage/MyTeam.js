import React, { Component } from "react";
import "./MyTeam.css";
import axios from "axios";
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
import { KeyboardEvent } from "react";
import PageHeader from "../PageHeader/PageHeader";
import { CssBaseline } from "@material-ui/core";

export default class MyTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 5,
    };
  }

  componentDidMount() {
    this.findAllUsers();
  }

  findAllUsers() {
    axios
      .get("http://localhost:8080/toolkit/home")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ users: data });
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
      Math.ceil(this.state.users.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.users.length / this.state.usersPerPage
        ),
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.users.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {
    const { users, currentPage, usersPerPage } = this.state;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = users.slice(firstIndex, lastIndex);
    const totalPages = users.length / usersPerPage;

    return (
      <>
        <div className="TeamTable">
          <PageHeader title="Team Page" subtitle="Make your team now!" />
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 600 }} aria-label="a dense table">
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
                    Email ID
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Department
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Organisation level
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Certifications
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Project
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Total Experience
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Ad Tech Experience
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow
                    key={user.e_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.employee_name}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }} align="center">
                      {user.email}
                    </TableCell>
                    <TableCell align="center">{user.department}</TableCell>
                    <TableCell align="center">{user.org_level}</TableCell>
                    <TableCell align="center">{user.certifications}</TableCell>
                    <TableCell align="center">{user.projects}</TableCell>
                    <TableCell align="center">{user.total_exp}</TableCell>
                    <TableCell align="center">{user.ad_tech_exp}</TableCell>
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
        <CssBaseline />
      </>
    );
  }
}
