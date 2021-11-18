import { connect } from 'react-redux';

// Локальные компоненты
import WikiStation from './WikiOkolotok';


function mapStateToProps( state ) {
  return {
    isLoading: state.wiki.okolotok.isLoading,
    data: state.wiki.okolotok.data,
  };
}

export default connect(mapStateToProps, null)(WikiStation);