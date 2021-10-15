import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

import { Layout } from 'antd';

// style
import 'react-toastify/dist/ReactToastify.css';


// My components
import Header from '../components/Header/Header';
import SwitchBreadcrumb from '../components/SwitchBreadcrumb/SwitchBreadcrumb';
import AppRouteContent from '../components/AppRouteContent/AppRouteContent';


// import AuthRoute from '../components/Routs/AuthRoute';
// import GuestRoute from '../components/Routs/GuestRoute';
// import CommonMenuItem from '../components/MenuItem/CommonMenuItem';
// import GuestMenuItem from '../components/MenuItem/GuestMenuItem';
// import AuthNavLink from '../components/NavLinks/AuthNavLink';
// import GuestNavLink from '../components/NavLinks/GuestNavLink';
// import PrivateButton from '../components/Buttons/PrivateButton';

// import PageMain from '../pages/Main/Main';
// import PageWiki from '../pages/Wiki/Wiki';

// import PageLogin from '../pages/Login/Login';
// import PageLogout from '../pages/Logout/Logout';

// import Priv from '../pages/Private/Private';
// import Pub from '../pages/Public/Public';

import style from './App.module.scss';


const { Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Header />
        <Content>
          <Layout className={`{"site-layout-background"} ${style.container}`}>
          {/* <Layout> */}
            <Layout className={style.containerRightSpace}>
              <SwitchBreadcrumb />
                <Content className={`{"site-layout-background"} ${style.containerContent}`}>
                  <AppRouteContent />
                  {/* <Switch>
                    <GuestRoute exact path="/login" component={PageLogin} />
                    <AuthRoute exact path="/private" component={Priv} />
                    <AuthRoute exact path="/logout" component={PageLogout} />
                    <Route exact path="/public" component={Pub} />
                    <Route exact path="/wiki" component={PageWiki} />
                    <Route exact path="/" component={PageMain} />
                  </Switch> */}
                </Content>
              </Layout>
            </Layout>
          </Content>
        <Footer theme="dark" style={{ textAlign: 'center' }}>©2021</Footer>
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
