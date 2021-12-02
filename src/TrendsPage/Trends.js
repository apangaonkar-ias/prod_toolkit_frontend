import React from "react";
import Widgets from "../Widgets/Widgets";
import trendImage from "../images/trends.png";
import "./Trends.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Bottom3Skill_emp from "../TableauEmbed/Bottom3Skill_emp";
import Bottom3Skills_mgr from "../TableauEmbed/Bottom3Skills_mgr";
import Top3Skill_mgr from "../TableauEmbed/Top3Skill_mgr";
import Top3Skill_no_emp from "../TableauEmbed/Top3Skill_no_emp";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import PageHeader from "../PageHeader/PageHeader";

function Trends() {
  return (
    <>
      <Header />
      <div className="app__body">
        <div>
          <Sidebar />
        </div>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid
            item
            xs={9}
            style={{ paddingLeft: "250px", paddingBottom: "45px" }}
          >
            <Top3Skill_mgr />
          </Grid>
          <Grid
            item
            xs={9}
            style={{ paddingLeft: "250px", paddingBottom: "45px" }}
          >
            <Bottom3Skills_mgr />
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
}

export default Trends;
