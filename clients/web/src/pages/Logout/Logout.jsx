import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { toast } from 'react-toastify';
import { Route, Redirect } from 'react-router-dom';
import { logout } from '../../redux/auth/thunks';


function Logout({ onLogout }) {
  useEffect(() => {
    onLogout();
    toast.warning('Вы успешно вышли из системы.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    }, []);

  return (
    <Route
      render={({ location }) =>
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      }
    />
  );
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

Logout.defaultProps = {
};

function mapDispatchToProps( dispatch ) {
  return {
    onLogout: () => {
      dispatch(logout());
    },
  };
}


export default connect(null, mapDispatchToProps)(Logout);