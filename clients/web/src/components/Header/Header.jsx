import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { Layout, Menu } from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';

import urlConst, { PERMISSION_PUBLIC, PERMISSION_GUEST, PERMISSION_PRIVATE } from '../../App/urlConst';


const { SubMenu } = Menu;


function renderMenu(urlTree, isAuth, urlPrefix='') {
  if(!urlTree) {
    return null;
  }

  const renderTree = [];

  Object.keys(urlTree).forEach(key => {
    let currentElement = <></>;
    if(urlTree[key].menu) {
      const localMenuTree = renderMenu(urlTree[key].menu, isAuth, urlPrefix+urlTree[key].url);
      
      currentElement =<SubMenu key={urlPrefix+urlTree[key].url} icon={urlTree[key].icon} title={urlTree[key].title}>{localMenuTree}</SubMenu>;
    } else {
      currentElement = <Menu.Item key={urlPrefix+urlTree[key].url}><Link to={urlPrefix+urlTree[key].url}>{urlTree[key].title}</Link></Menu.Item>;
    }

    if(isAuth){
      if(urlTree[key].permission === PERMISSION_PUBLIC || urlTree[key].permission === PERMISSION_PRIVATE) {
        renderTree.push(currentElement);
      }
    } else if(urlTree[key].permission === PERMISSION_PUBLIC || urlTree[key].permission === PERMISSION_GUEST) {
        renderTree.push(currentElement);
      }
  });

  return renderTree;
}

function CustomHeader({ isAuth }) {
  const { Header } = Layout;
  const location = useLocation();

  const currentMenu = useMemo(() => renderMenu(urlConst, isAuth), [isAuth]);

  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['/']}
        selectedKeys={[location.pathname]}
        >
          {currentMenu}
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

export default connect(mapStateToProps, null)(CustomHeader);