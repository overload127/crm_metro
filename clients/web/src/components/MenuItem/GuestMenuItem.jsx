import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Menu } from 'antd';


function GuestMenuItem({ isAuth, inKey, to, children }) {
  if(isAuth) {
    return <></>;
  }
  return (<Menu.Item key={inKey}><Link to={to} >{children}</Link></Menu.Item>);
}

GuestMenuItem.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  inKey: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

GuestMenuItem.defaultProps = {
};

function mapStateToProps( state ) {
  return {
    isAuth: state.auth.isAuth
  };
}


export default connect(mapStateToProps, null)(GuestMenuItem);