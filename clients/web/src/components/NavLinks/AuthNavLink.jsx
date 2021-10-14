import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';


function AuthNavLink({ isAuth, ...props }) {
  if(isAuth) {
    return (<NavLink {...props}  />);
  }
  return <></>;
}

AuthNavLink.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

AuthNavLink.defaultProps = {
};

function mapStateToProps( state ) {
  return {
    isAuth: state.auth.isAuth
  };
}


export default connect(mapStateToProps, null)(AuthNavLink);