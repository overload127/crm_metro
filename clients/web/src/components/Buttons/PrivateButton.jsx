import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";


function PrivateButton({ isAuth, props }) {
  if(isAuth) {
    return (<li><button type="button" {...props} /></li>);
  }
  return <></>;
}

PrivateButton.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  props: PropTypes.shape({}).isRequired,
};

PrivateButton.defaultProps = {
};

function mapStateToProps( state, props ) {
  return {
    isAuth: state.auth.isAuth,
    props
  };
}


export default connect(mapStateToProps, null)(PrivateButton);