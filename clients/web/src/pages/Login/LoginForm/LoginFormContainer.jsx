import { connect } from 'react-redux';
import { login } from '../../../redux/auth/thunks';

// Общие компоненты
// Локальные компоненты
import Login from './LoginForm';


function mapStateToProps( state ) {
  return {
    processAuth: state.auth.processAuth,
  };
}


function mapDispatchToProps( dispatch ) {
  return {
    onLogin: (username, password) => {
      dispatch(login(username, password));
    },
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);