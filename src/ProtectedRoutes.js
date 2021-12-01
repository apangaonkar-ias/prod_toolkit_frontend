import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React, { Component } from "react";

function ProtectedRoutes({ isAuth: isAuth, component: Component, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          if (isAuth) {
            return <Component />;
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: props.location } }}
              />
            );
          }
        }}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(ProtectedRoutes);
