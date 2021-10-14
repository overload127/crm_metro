import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';


function PublicNavLink({ isAuth, props }) {
  if(isAuth) {
    return <></>;
  }
  return (<li><NavLink {...props}  /></li>);
}

PublicNavLink.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  props: PropTypes.shape({}).isRequired,
};

PublicNavLink.defaultProps = {
};

function mapStateToProps( state, props ) {
  return {
    isAuth: state.auth.isAuth,
    props
  };
}


export default connect(mapStateToProps, null)(PublicNavLink);