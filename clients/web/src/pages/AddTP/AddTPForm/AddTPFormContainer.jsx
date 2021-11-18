import { connect } from 'react-redux';
import { createTPWorkToServer } from '../../../redux/tpwork/thunks';

// Общие компоненты
// Локальные компоненты
import AddTPForm from './AddTPForm';


function mapStateToProps( state ) {
  return {
    isCreating: state.tpwork.isCreating,
    isLoadingWiki: state.wiki.isLoading,
    stations: state.wiki.stations,
    okolotoks: state.wiki.okolotok,
    users: state.wiki.users,
    techCards: state.wiki.techCards,
  };
}


function mapDispatchToProps( dispatch ) {
  return {
    onCreateTPWorkToServer: (datetimeStart, datetimeEnd, station, typeWorks, okolotok, users) => {
      dispatch(createTPWorkToServer(datetimeStart, datetimeEnd, station, typeWorks, okolotok, users));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddTPForm);