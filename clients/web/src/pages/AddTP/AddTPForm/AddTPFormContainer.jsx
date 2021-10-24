import { connect } from 'react-redux';
import { createTPWorkToServer } from '../../../redux/TPActions/thunks';

// Общие компоненты
// Локальные компоненты
import AddTPForm from './AddTPForm';


function mapStateToProps( state ) {
  return {
    isCreating: state.TPActions.isCreating,
    stations: state.wiki.stations,
    techCards: state.wiki.techCards,
  };
}


function mapDispatchToProps( dispatch ) {
  return {
    onCreateTPWorkToServer: (datetimeStart, datetimeEnd, station, typeWorks) => {
      dispatch(createTPWorkToServer(datetimeStart, datetimeEnd, station, typeWorks));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTPForm);