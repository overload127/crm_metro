import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Menu } from 'antd';


function CommonMenuItem({ inKey, to, children }) {
  return (<Menu.Item key={inKey}><Link to={to} >{children}</Link></Menu.Item>);
}

CommonMenuItem.propTypes = {
  inKey: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

CommonMenuItem.defaultProps = {
};

export default CommonMenuItem;