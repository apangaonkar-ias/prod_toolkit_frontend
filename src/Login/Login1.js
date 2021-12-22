import React from "react";
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import "./Login1.css";
import Header from "../Header/Header";
import logo from "../images/logo.png";
import { connect } from "react-redux";
import { authenticateUser } from "../Services/index";
import prod from "./prod.png";
import loginImage from "./prod.png";
import Footer from "../Footer/Footer";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    email: "",
    password: "",
    error: "",
  };

  credentialChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validateUser = (e) => {
    e.preventDefault();
    // var postData = new FormData();

    // postData.append("email", this.state.email);
    // postData.append("password", this.state.password);
    // postData.append("role", this.state.role);

    // for (var pair of postData.entries()) {
    //   console.log(pair[0] + " " + pair[1]);
    // }

    this.props.authenticateUser(this.state.email, this.state.password);

    setTimeout(() => {
      if (this.props.auth.isLoggedIn) {
        return this.props.history.push("/Home");
      } else {
        this.resetLoginForm();
        this.setState({ error: "Invaid email and password" });
      }
    }, 500);
  };

  resetLoginForm = () => {
    this.setState(() => this.initialState);
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <>
        <div>
          <Header />

          <Grid container spacing={0} justify="center" direction="row">
            {error && window.alert("Wrong Email Or Password")}
            <Grid item>
              <Grid
                container
                direction="column"
                justify="center"
                spacing={2}
                className="login-form"
                style={{ widht: "400px" }}
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
                      {/* <h3>Productivity Toolkit</h3> */}
                    </div>
                  </Grid>
                  <Grid item>
                    <form>
                      <Grid container direction="column" spacing={2}>
                        <Grid
                          item
                          style={{ paddingLeft: "0px", paddingRight: "16px" }}
                        >
                          <TextField
                            type="text"
                            placeholder="Please enter Email"
                            fullWidth
                            name="email"
                            variant="outlined"
                            autoComplete="off"
                            value={email}
                            onChange={this.credentialChange}
                            autoFocus
                          />
                        </Grid>

                        <Grid
                          item
                          style={{ paddingLeft: "0px", paddingRight: "16px" }}
                        >
                          <TextField
                            type="password"
                            placeholder="Enter your password"
                            fullWidth
                            name="password"
                            autoComplete="new-password"
                            variant="outlined"
                            value={password}
                            onChange={this.credentialChange}
                          />
                        </Grid>
                        {/* <Grid
                        item
                        style={{ paddingLeft: "0px", paddingRight: "16px" }}
                      >
                        <TextField
                          type="test"
                          placeholder="Enter your role"
                          fullWidth
                          name="role"
                          autoComplete="off"
                          variant="outlined"
                          value={role}
                          onChange={this.credentialChange}
                        />
                      </Grid> */}

                        <Grid item>
                          <Button
                            style={{ marginBottom: "15px" }}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className="button-block"
                            onClick={this.validateUser}
                            disabled={
                              this.state.email.length === 0 ||
                              this.state.password.length === 0
                            }
                          >
                            Submit
                          </Button>

                          <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            className="button-block"
                            onClick={this.resetLoginForm}
                            disabled={
                              this.state.email.length === 0 &&
                              this.state.password.length === 0 &&
                              this.state.error.length === 0
                            }
                          >
                            Reset
                          </Button>
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
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (email, password) =>
      dispatch(authenticateUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
