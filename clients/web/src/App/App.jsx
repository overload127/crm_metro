import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';

import { Layout } from 'antd';

// style
import 'react-toastify/dist/ReactToastify.css';


// My components
import Header from '../components/Header/Header';
import ProgressBar from '../components/ProgressBar/ProgressBarContainer';
import SwitchBreadcrumb from '../components/SwitchBreadcrumb/SwitchBreadcrumb';
import AppRouteContent from '../components/AppRouteContent/AppRouteContent';

import style from './App.module.scss';


const { Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Header />
        <Content>
          <Layout className={`{"site-layout-background"} ${style.container}`}>
            <Layout className={style.containerRightSpace}>
              <ProgressBar />
              <SwitchBreadcrumb />
                <Content className={`{"site-layout-background"} ${style.containerContent}`}>
                  <AppRouteContent />
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
