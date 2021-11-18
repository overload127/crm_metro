import { connect } from 'react-redux';

import { loadTPWorkData } from '../../redux/tpwork/thunks';
// Локальные компоненты
import DisplayTP from './DisplayTP';


function mapStateToProps( state ) {
  return {
    isLoadingWiki: state.tpwork.isLoading,
    TPWorks: state.tpwork.TPWorks,
    stations: state.wiki.stations,
    okolotoks: state.wiki.okolotok,
    users: state.wiki.users,
    techCards: state.wiki.techCards,
    currentUser: state.user,
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    onLoadTPWorkData: (dateStart, dateEnd, okolotokID, stationID, userProfiles, typeDU46, typeOrder, typePafu, typeJtp, techCards) => {
      dispatch(loadTPWorkData(dateStart, dateEnd, okolotokID, stationID, userProfiles, typeDU46, typeOrder, typePafu, typeJtp, techCards));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTP);