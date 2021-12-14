import React from "react";
import { Button, TextField, Grid, Paper } from "@material-ui/core";
// import "./Login1.css";
import Header from "../Header/Header";
import logo from "../images/logo.png";
import loginImage from "../Login/prod.png";
import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <>
      <div>
        <Header />

        <Grid container spacing={0} justify="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="login-form"
              style={{ width: "400px" }}
            >
              <Paper
                variant="elevation"
                elevation={4}
                className="login-background"
                style={{ width: "350px", padding: "50px" }}
              >
                <Grid item>
                  <div
                    style={{
                      paddingBottom: "20px",
                      alignItems: "center",
                    }}
                  >
                    <prod />
                    <img
                      src={loginImage}
                      alt="Image"
                      style={{ width: "250px", height: "55px" }}
                    ></img>
                  </div>
                </Grid>
                <Grid item>
                  <form>
                    <Grid container direction="column" spacing={2}>
                      <h3
                        style={{
                          textAlign: "center",
                          marginBottom: "45px",
                          marginTop: "25px",
                        }}
                      >
                        You've been logged out!
                      </h3>
                      <Grid item>
                        <Link to="/Login" style={{ textDecoration: "none" }}>
                          <Button
                            style={{ marginBottom: "0px" }}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className="button-block"
                          >
                            Login
                          </Button>
                        </Link>
                      </Grid>
                      <Grid
                        item
                        style={{
                          paddingLeft: "0px",
                          backgroundColor: "#ff574a;",
                        }}
                      ></Grid>
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
