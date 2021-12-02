import React, { useState, useEffect, Component } from "react";
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
import {
  CssBaseline,
  Toolbar,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import TableauSkills from "../TableauEmbed/TableauSkills";
import TableauDeltaSkills from "../TableauEmbed/TableauDeltaSkills";
import SkillRegisterPage from "../SkillRegisterPage/SkillRegisterPage";
import Controls from "../Controls/Controls";
import Popup from "../Popup";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import AddIcon from "@mui/icons-material/Add";
import Search from "@mui/icons-material/Search";

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

export default function TeamSkills1() {
  const [skills, setSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;

  useEffect(() => {
    findAllUsers_Skills();
  }, []);

  const findAllUsers_Skills = () => {
    axios
      .get("http://localhost:8080/toolkit/home2")
      .then((response) => response.data)
      .then((data) => {
        // this.setState({ skills: data });
        setSkills(data);
        console.log(data);
      });
  };

  const openInPopup = (user) => {
    setRecordForEdit(user);
    setOpenPopup(true);
  };

  const currentUsers = skills.slice(firstIndex, lastIndex);

  const totalPages = skills.length / usersPerPage;

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
    if (currentPage < Math.ceil(skills.length / usersPerPage)) {
      setCurrentPage(Math.ceil(skills.length / usersPerPage));
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(skills.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <>
      <Header></Header>
      <div className="app__body">
        <div>
          <Sidebar />
        </div>
        <div className="TeamTable">
          <PageHeader
            title="Team Skills Page"
            subtitle="Check skills your team possesses"
          />
          <TableContainer component={Paper}>
            {/* <Toolbar>
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
            </Toolbar> */}
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
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                    align="center"
                  >
                    Actions
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
                    <TableCell align="center">
                      {skill.p_manager_rating}
                    </TableCell>
                    <TableCell align="center">
                      {skill.p_proficiency_level}
                    </TableCell>
                    <TableCell align="center">{skill.p_rating_delta}</TableCell>
                    <TableCell align="center">{skill.a_skills}</TableCell>

                    <TableCell align="center">{skill.a_self_rating}</TableCell>

                    <TableCell align="center">
                      {skill.a_proficiency_level}
                    </TableCell>
                    <TableCell align="center">
                      <div>
                        <Controls.ActionButton
                          color="primary"
                          variant="outlined"
                          onClick={() => {
                            openInPopup(skill);
                          }}
                        >
                          <ModeEditOutlineTwoToneIcon fontSize="small" />
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
            style={{ textAlign: "center", height: "630px" }}
          >
            <TableauSkills />
          </Paper>
          <Paper
            elevation={2}
            square
            style={{ textAlign: "center", height: "850px" }}
          >
            <TableauDeltaSkills />
          </Paper>
        </div>
      </div>
      <Popup
        title="Skills Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <SkillRegisterPage
          recordForEdit={recordForEdit}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          findAllUsers_Skills={findAllUsers_Skills}
        />
      </Popup>

      <Footer />
    </>
  );
}
