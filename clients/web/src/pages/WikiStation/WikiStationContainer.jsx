import { connect } from 'react-redux';

// Локальные компоненты
import WikiStation from './WikiStation';


function mapStateToProps( state ) {
  return {
    isLoading: state.wiki.stations.isLoading,
    data: state.wiki.stations.data,
  };
}

export default connect(mapStateToProps, null)(WikiStation);