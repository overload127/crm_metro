import { connect } from 'react-redux';

// Локальные компоненты
import WikiTechCard from './WikiTechCard';


function mapStateToProps( state ) {
  return {
    isLoading: state.wiki.techCards.isLoading,
    data: state.wiki.techCards.data,
  };
}

export default connect(mapStateToProps, null)(WikiTechCard);