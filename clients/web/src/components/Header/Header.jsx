import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { Layout, Menu } from 'antd';
// defaultSelectedKeys={['1']}

function CustomHeader({ isAuth }) {
  const { Header } = Layout;
  const location = useLocation();
  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['/']}
      selectedKeys={[location.pathname]}>
        <Menu.Item key="/"><Link to="/">Главная</Link></Menu.Item>
        <Menu.Item key="/wiki"><Link to="/wiki">Wiki</Link></Menu.Item>
        <Menu.Item key="/public"><Link to="/public">Public</Link></Menu.Item>
        {(isAuth) ? (
          <Menu.Item key="/private"><Link to="/private">Private</Link></Menu.Item>,
          <Menu.Item key="/logout"><Link to="/logout">Выход</Link></Menu.Item>
        ) : (
          <Menu.Item key="/login"><Link to="/login">Войти</Link></Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

CustomHeader.propTypes = {
    isAuth: PropTypes.bool.isRequired,
};

CustomHeader.defaultProps = {
};

function mapStateToProps( state ) {
    return {
      isAuth: state.auth.isAuth
    };
  }

// function mapDispatchToProps( dispatch ) {
//   return {
//     onLogout: () => {
//       dispatch(logout());
//     },
//   };
// }


export default connect(mapStateToProps, null)(CustomHeader);