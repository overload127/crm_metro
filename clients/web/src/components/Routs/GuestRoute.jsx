import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Route, Redirect, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


function GuestRoute({ isAuth, processAuth, ...props }) {
  if(isAuth) {
    const location = useLocation();
    if(!processAuth) {
      useEffect(() => {
        toast.info(`Страница [${location.pathname}] доступна только не авторизоавным пользователям.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }, []);
    }
    return <Redirect to={{ pathname: "/", state: { from: location } }} />;
  }
  return (<Route {...props} />);
}

GuestRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  processAuth: PropTypes.bool.isRequired,
};

GuestRoute.defaultProps = {
};

function mapStateToProps( state ) {
  return {
    isAuth: state.auth.isAuth,
    processAuth: state.auth.processAuth,
  };
}


export default connect(mapStateToProps, null)(GuestRoute);