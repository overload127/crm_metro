import { connect } from 'react-redux';
import { endBarInit } from '../../redux/progressBar/thunks';

// Общие компоненты
import ProgressBar from './ProgressBar';


function mapStateToProps( state ) {
  return {
    initLodding: state.progressBar.initLodding,
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    onEndBarInit: () => {
      dispatch(endBarInit());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);