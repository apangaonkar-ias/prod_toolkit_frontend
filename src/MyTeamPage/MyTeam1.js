import React, { useState, useEffect } from "react";
import "./MyTeam.css";
import { Link } from "react-router-dom";
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
import {
  CssBaseline,
  Toolbar,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import RegisterUser from "../RegisterPage/RegisterUser";
import Controls from "../Controls/Controls";
import Search from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../Popup";
import "../TeamSkillsPage/TeamSkills";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";

// import { getAllEmployees } from "../Services/employeeService";
import * as employeeService from "../Services/employeeService";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));
// export const [openPopup, setOpenPopup] = useState(false);

export default function MyTeam1() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);

  // const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
  //   useForm(initialFValues, true, validate);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;

  useEffect(() => {
    findAllUsers();
  }, []);

  const findAllUsers = () => {
    console.log("in finadALLusers");

    axios
      .get("http://localhost:8080/toolkit/home")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setUsers(data);
      });

    // employeeService.getAllEmployees();
    // console.log(data);
    // setUsers(data);
  };

  const currentUsers = users.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(users.length / usersPerPage);

  //   const     handleKeywordKeyPress = (e) => {
  //     if (e.key == "Enter" && e.target.value) {
  //       let x = e.target.value;
  //       if (typeof e.target.value == "string") {
  //         x = parseInt(e.target.value);
  //       }
  //       this.setState({
  //         [e.target.name]: x,
  //       });
  //     }
  //   };

  const changePage = (e) => {
    let x = e.target.value;

    if (typeof x == "string" && x) {
      x = parseInt(x);
    }

    setCurrentPage(x);
  };

  const firstPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const lastPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(Math.ceil(users.length / usersPerPage));
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (users) => {
        if (target.value == "") return users;
        else
          return users.filter((x) =>
            x.employee_name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const addOrEdit = (employee, resetForm) => {
    if (employee.id == 0) {
      //employeeService.insertEmployee(employee);
      axios.post("");
      console.log("In add service - myteam1.js");
    } else {
      //employeeService.updateEmployee(employee);
      console.log("In edit service - myteam1.js");
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    //setRecords(findAllUsers());
  };

  const deleteUser = (userId) => {
    axios
      .delete("http://localhost:8080/toolkit/deleteEmp/" + userId)
      .then((response) => {
        if (response.data != null) {
          alert("User Deleted Succesfully");
          findAllUsers();
        }
      });
  };

  const openInPopup = (user) => {
    setRecordForEdit(user);
    setOpenPopup(true);
  };

  return (
    <>
      <div className="TeamTable">
        <PageHeader title="Team Page" subtitle="Make your team now!" />
        <TableContainer component={Paper}>
          <Toolbar>
            <Controls.Input
              label="Search Employees"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            {/* <Controls.Button
                      text = "Add New"
                      variant='outlined'
                      startIcon = {<AddIcon/>}
                    /> */}

            <Controls.Button
              text="Add New"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {
                console.log("in on click");
                setOpenPopup(true);
                setRecordForEdit(null);
                console.log("after on click");
              }}
            />
          </Toolbar>
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
                  Team
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
                <TableCell
                  style={{ fontWeight: "bold", fontSize: "15px" }}
                  align="center"
                >
                  Actions
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
                  <TableCell align="center">{user.team}</TableCell>
                  <TableCell align="center">{user.certifications}</TableCell>
                  <TableCell align="center">{user.projects}</TableCell>
                  <TableCell align="center">{user.total_exp}</TableCell>
                  <TableCell align="center">{user.ad_tech_exp}</TableCell>
                  <TableCell align="center">
                    <div>
                      <Controls.ActionButton
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          openInPopup(user);
                        }}
                      >
                        <ModeEditOutlineTwoToneIcon fontSize="small" />
                      </Controls.ActionButton>

                      <Controls.ActionButton
                        color="secondary"
                        variant="outlined"
                        onClick={() => {
                          deleteUser(user.e_id);
                        }}
                      >
                        <DeleteOutlineTwoToneIcon fontSize="small" />
                      </Controls.ActionButton>
                    </div>
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
                    onClick={firstPage}
                  >
                    <FirstPageIcon /> First
                  </Button>
                  <Button
                    className="buttonStyle"
                    variant="outlined"
                    disabled={currentPage === 1 ? true : false}
                    onClick={prevPage}
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
                    onChange={changePage}
                  />
                </div>
                <FormGroup row>
                  <Button
                    className="buttonStyle"
                    variant="outlined"
                    disabled={currentPage === totalPages ? true : false}
                    onClick={nextPage}
                  >
                    Next <NavigateNextIcon />
                  </Button>
                  <Button
                    className="buttonStyle"
                    variant="outlined"
                    disabled={currentPage === totalPages ? true : false}
                    onClick={lastPage}
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
        <Popup
          title="Employee Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <RegisterUser recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
        </Popup>
      </div>
      <CssBaseline />
    </>
  );

  return {
    findAllUsers,
  };
}
