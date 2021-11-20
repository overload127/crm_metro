import React, { useEffect }  from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { loadWikiData } from '../redux/wiki/thunks';
import { loadTPWorkDataFull } from '../redux/tpwork/thunks';
import { loadUserProfile } from '../redux/user/thunks';

// Общие компоненты
import App from './App';


function AppContainer({ isAuth, okolotokId, userId, onloadWikiData, onloadTPWorkData, onloadUserData }) {
  useEffect(() => {
    if(isAuth) {
      onloadUserData();
      onloadWikiData();
    }
  }, [isAuth]);

  useEffect(() => {
    if(isAuth && userId && userId !== -1 && okolotokId && okolotokId !== -1) {
      onloadTPWorkData(okolotokId);
    }
  }, [userId, okolotokId]);

  return (<App/>);
}

AppContainer.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  okolotokId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  onloadWikiData: PropTypes.func.isRequired,
  onloadTPWorkData: PropTypes.func.isRequired,
  onloadUserData: PropTypes.func.isRequired,
};

AppContainer.defaultProps = {
};

function mapStateToProps( state ) {
  return {
    isAuth: state.auth.isAuth,
    userId: state.user.id,
    okolotokId: state.user.okolotok.id,
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    onloadUserData: () => {
      dispatch(loadUserProfile());
    },
    onloadWikiData: () => {
      dispatch(loadWikiData());
    },
    onloadTPWorkData: (okolotokId) => {
      dispatch(loadTPWorkDataFull(okolotokId));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);