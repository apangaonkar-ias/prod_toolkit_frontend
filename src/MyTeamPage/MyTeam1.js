import React, { useState, useEffect } from "react";
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
import PageHeader from "../PageHeader/PageHeader";
import { CssBaseline, Toolbar, makeStyles } from "@material-ui/core";
import RegisterUser from "../RegisterPage/RegisterUser";
import Controls from "../Controls/Controls";
import AddIcon from "@mui/icons-material/Add";
import Popup from "../Popup";
import "../TeamSkillsPage/TeamSkills";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import TableauEmp from "../TableauEmbed/TableauEmp";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../Services/index";

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

function MyTeam1(props) {
  const [users, setUsers] = useState([]);

  console.log(props.userData);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);

  const [filterFn, setFilterFn] = useState({
    fn: (users) => {
      return users;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    findAllUsers();
    getLoggedInDetails();
    console.log(logged_in_user);
    // props.fetchUsers();
  }, []);

  let logged_user = [];
  const [logged_in_user, set_logged_in_user] = useState([]);

  const getLoggedInDetails = () => {
    var config = {
      method: "get",
      url: "http://localhost:8080/toolkit/getEmpDetails",
      headers: {
        Authorization: `Bearer ${localStorage.jwtToken}`,
      },
    };

    axios(config)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        logged_user = data;
        console.log(logged_user);
        set_logged_in_user(data);
      });
    console.log(logged_in_user);
  };

  const current_logged_in_user = logged_in_user.slice();
  console.log(current_logged_in_user);

  const findAllUsers = () => {
    console.log("in finadALLusers");
    const headers = {
      Authorization: `Bearer ${localStorage.jwtToken}`,
    };

    axios
      .get("http://localhost:8080/toolkit/home", { headers: headers })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  };

  const currentUsers = users.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(users.length / usersPerPage);

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

  // const handleSearch = (e) => {
  //   console.log("Inside Handle Search");
  //   let target = e.target;
  //   setFilterFn({
  //     fn: (users) => {
  //       if (target.value == "") return users;
  //       else
  //         return users.filter((x) =>
  //           x.employee_name.toLowerCase().includes(target.value)
  //         );
  //     },
  //   });
  // };

  const deleteUser = (userId) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    const headers = {
      Authorization: `Bearer ${localStorage.jwtToken}`,
    };

    axios
      .delete("http://localhost:8080/toolkit/deleteEmp/" + userId, {
        headers: headers,
      })
      .then((response) => {
        if (response.data != null) {
          findAllUsers();
          props.fetchUsers();
          setNotify({
            isOpen: true,
            message: "Deleted Succesfully",
            type: "error",
          });
        }
      });
  };

  const openInPopup = (user) => {
    setRecordForEdit(user);
    setOpenPopup(true);
  };

  return (
    <>
      <Header />
      <div className="app__body">
        <div>
          <Sidebar />
        </div>
        <div className="TeamTable">
          <PageHeader title="Team Page" subtitle="Make your team now!" />
          <TableContainer component={Paper}>
            {current_logged_in_user.map((loggedUser) => (
              <Toolbar>
                {loggedUser.role === "Manager" ? (
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
                ) : (
                  ""
                )}
              </Toolbar>
            ))}
            <Table sx={{ maxWidth: 600 }} aria-label="a dense table">
              <TableHead style={{ backgroundColor: "#A2D2FF" }}>
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
                      {current_logged_in_user.map((loggedUser) => (
                        <div>
                          {loggedUser.role === "Manager" ||
                          loggedUser.e_id === user.e_id ? (
                            <Controls.ActionButton
                              color="primary"
                              variant="outlined"
                              onClick={() => {
                                openInPopup(user);
                              }}
                            >
                              <ModeEditOutlineTwoToneIcon fontSize="small" />
                            </Controls.ActionButton>
                          ) : (
                            ""
                          )}
                          {loggedUser.role === "Manager" && (
                            <Controls.ActionButton
                              color="secondary"
                              variant="outlined"
                              onClick={() => {
                                setConfirmDialog({
                                  isOpen: true,
                                  title: "Are you sure you want to delete?",
                                  subTitle: "You can't undo this operation",
                                  onConfirm: () => {
                                    deleteUser(user.e_id);
                                  },
                                });
                              }}
                            >
                              <DeleteOutlineTwoToneIcon fontSize="small" />
                            </Controls.ActionButton>
                          )}
                        </div>
                      ))}
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
            style={{ textAlign: "center", height: "850px" }}
          >
            <TableauEmp />
          </Paper>
          <Popup
            title="Employee Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <RegisterUser
              recordForEdit={recordForEdit}
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
              findAllUsers={findAllUsers}
              // fetchUsers={fetchUsers}
            />
          </Popup>
        </div>

        <Notification notify={notify} setNotify={setNotify} />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />

        <CssBaseline />
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
    userObject: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUser: (userId) => dispatch(deleteUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTeam1);
