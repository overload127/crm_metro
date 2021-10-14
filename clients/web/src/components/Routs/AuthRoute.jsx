import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';


function AuthRoute({ isAuth, ...props }) {
  useEffect(() => {
    if(!isAuth) {
      toast.warning('Авторизуйтесь что бы получить доступ к данной странице.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [isAuth]);

  if(isAuth) {
    return (<Route {...props} />);
  }
  return (
    <Route
      render={({ location }) =>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      }
    />
  );
}

AuthRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

AuthRoute.defaultProps = {
};

function mapStateToProps( state ) {
  return {
    isAuth: state.auth.isAuth
  };
}


export default connect(mapStateToProps, null)(AuthRoute);