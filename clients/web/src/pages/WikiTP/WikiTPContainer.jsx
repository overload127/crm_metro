import { connect } from 'react-redux';

// Локальные компоненты
import WikiTP from './WikiTP';


function mapStateToProps( state ) {
  return {
    data: state.wiki.tp.data,
  };
}

export default connect(mapStateToProps, null)(WikiTP);