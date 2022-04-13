import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateComponent = ({Component, isAuthUser}) => {
  return isAuthUser ? <Component /> : <Navigate to="/login" />
};

const mapStateToProps = ({ isAuthUser }) => ({
  isAuthUser
});

export default connect(mapStateToProps)(PrivateComponent);