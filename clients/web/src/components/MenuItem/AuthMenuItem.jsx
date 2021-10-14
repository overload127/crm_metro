import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Menu } from 'antd';


function AuthMenuItem({ isAuth, key, props }) {
  if(isAuth) {
    return (<Menu.Item key={key}><Link {...props} /></Menu.Item>);
  }
  return <></>;
}

AuthMenuItem.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  key: PropTypes.string.isRequired,
  props: PropTypes.shape({}).isRequired,
};

AuthMenuItem.defaultProps = {
};

function mapStateToProps( state, props ) {
  return {
    isAuth: state.auth.isAuth,
    props
  };
}


export default connect(mapStateToProps, null)(AuthMenuItem);