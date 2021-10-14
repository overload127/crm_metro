import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

// style
import 'react-toastify/dist/ReactToastify.css';


// My components
import Header from '../components/Header/Header';
import SwitchBreadcrumb from '../components/SwitchBreadcrumb/SwitchBreadcrumb';


import AuthRoute from '../components/Routs/AuthRoute';
import GuestRoute from '../components/Routs/GuestRoute';
// import CommonMenuItem from '../components/MenuItem/CommonMenuItem';
// import GuestMenuItem from '../components/MenuItem/GuestMenuItem';
// import AuthNavLink from '../components/NavLinks/AuthNavLink';
// import GuestNavLink from '../components/NavLinks/GuestNavLink';
// import PrivateButton from '../components/Buttons/PrivateButton';

import PageMain from '../pages/Main/Main';
import PageWiki from '../pages/Wiki/Wiki';

import PageLogin from '../pages/Login/Login';
import PageLogout from '../pages/Logout/Logout';

import Priv from '../pages/Private/Private';
import Pub from '../pages/Public/Public';

// import style from './App.module.scss';


const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

function App() {
  return (
    <>
    {/* <div className={style.container}>
      <p className={style.textWhite}>Какой-то текст</p>
      <Router>
        <nav>
          <ul>
            <li><NavLink className={style.simply} activeClassName={style.active} exact to="/">Home</NavLink></li>
            <GuestNavLink className={style.simply} activeClassName={style.active} exact to="/login">Login</GuestNavLink>
            <li><NavLink className={style.simply} activeClassName={style.active} exact to="/public">Public</NavLink></li>
            <AuthNavLink className={style.simply} activeClassName={style.active} exact to="/private">Private</AuthNavLink>
            <AuthNavLink className={style.simply} activeClassName={style.active} exact to="/logout">Logout</AuthNavLink>
          </ul>
        </nav>
        <Switch>
          <GuestRoute exact path="/login" component={PageLogin} />
          <AuthRoute exact path="/private" component={Priv} />
          <AuthRoute exact path="/logout" component={PageLogout} />
          <Route exact path="/public" component={Pub} />
          <Route exact path="/" component={PageMain} />
        </Switch>
      </Router>
      <ToastContainer
          position="top-right"
          transition={Slide}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
    </div> */}



  <Layout>
    <Header />
    <Content style={{ padding: '0 50px' }}>
      <SwitchBreadcrumb />
      {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Switch>
            <GuestRoute exact path="/login" component={PageLogin} />
            <AuthRoute exact path="/private" component={Priv} />
            <AuthRoute exact path="/logout" component={PageLogout} />
            <Route exact path="/public" component={Pub} />
            <Route exact path="/wiki" component={PageWiki} />
            <Route exact path="/" component={PageMain} />
          </Switch>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>

  <ToastContainer
          position="top-right"
          transition={Slide}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>




</>









  );
};

export default App;
