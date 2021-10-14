import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Route, Redirect } from 'react-router-dom';
import { logout } from '../../redux/auth/thunks';


function Logout({ onLogout }) {
  useEffect(()=>{
    onLogout();
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