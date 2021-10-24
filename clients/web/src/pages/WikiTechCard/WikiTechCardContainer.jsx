import { connect } from 'react-redux';

// Локальные компоненты
import WikiTechCard from './WikiTechCard';


function mapStateToProps( state ) {
  return {
    data: state.wiki.techCards.data,
  };
}

export default connect(mapStateToProps, null)(WikiTechCard);