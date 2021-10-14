import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';


function AuthNavLink({ isAuth, props }) {
  if(isAuth) {
    return (<li><NavLink {...props}  /></li>);
  }
  return <></>;
}

AuthNavLink.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  props: PropTypes.shape({}).isRequired,
};

AuthNavLink.defaultProps = {
};

function mapStateToProps( state, props ) {
  return {
    isAuth: state.auth.isAuth,
    props
  };
}


export default connect(mapStateToProps, null)(AuthNavLink);