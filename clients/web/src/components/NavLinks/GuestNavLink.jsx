import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';


function GuestNavLink({ isAuth, ...props }) {
  if(isAuth) {
    return <></>;
  }
  return (<NavLink {...props}  />);
}

GuestNavLink.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

GuestNavLink.defaultProps = {
};

function mapStateToProps( state ) {
  return {
    isAuth: state.auth.isAuth
  };
}


export default connect(mapStateToProps, null)(GuestNavLink);