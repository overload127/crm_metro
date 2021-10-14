import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Route, Redirect, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


function GuestRoute({ isAuth, ...props }) {
  const location = useLocation();
  if(isAuth) {
    if(location.pathname === "/login") {
      useEffect(() => {
        toast.info('Вы уже авторизованы.', {
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
};

GuestRoute.defaultProps = {
};

function mapStateToProps( state, props ) {
  return {
    isAuth: state.auth.isAuth,
    props
  };
}


export default connect(mapStateToProps, null)(GuestRoute);