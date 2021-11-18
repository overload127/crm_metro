import { connect } from 'react-redux';

// Локальные компоненты
import WikiStation from './WikiDeviceForWork';


function mapStateToProps( state ) {
  return {
    isLoading: state.wiki.deviceForWork.isLoading,
    data: state.wiki.deviceForWork.data,
  };
}

export default connect(mapStateToProps, null)(WikiStation);