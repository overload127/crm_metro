import { connect } from 'react-redux';

// Локальные компоненты
import WikiStation from './WikiUserProfile';


function mapStateToProps( state ) {
  return {
    isLoading: state.wiki.users.isLoading,
    data: state.wiki.users.data,
  };
}

export default connect(mapStateToProps, null)(WikiStation);