import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthRoute from '../components/Routs/AuthRoute';
import GuestRoute from '../components/Routs/GuestRoute';
import AuthNavLink from '../components/NavLinks/AuthNavLink';
import GuestNavLink from '../components/NavLinks/GuestNavLink';
// import PrivateButton from '../components/Buttons/PrivateButton';

import PageMain from '../pages/Main/Main';

import PageLogin from '../pages/Login/Login';
import PageLogout from '../pages/Logout/Logout';

import Priv from '../pages/Private/Private';
import Pub from '../pages/Public/Public';

import style from './App.module.scss';


function App() {
  return (
    <div className={style.container}>
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
    </div>
  );
};

export default App;
