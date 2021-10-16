import React, { useEffect }  from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { loadWikiData } from '../redux/wiki/thunks';

// Общие компоненты
import App from './App';


function AppContainer({ onloadWikiData }) {
  useEffect(() => {
    onloadWikiData();
  }, []);

  return (<App/>);
}

AppContainer.propTypes = {
  onloadWikiData: PropTypes.func.isRequired,
};

AppContainer.defaultProps = {
};

function mapDispatchToProps( dispatch ) {
  return {
    onloadWikiData: () => {
      dispatch(loadWikiData());
    },
  };
}


export default connect(null, mapDispatchToProps)(AppContainer);