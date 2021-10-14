import { connect } from 'react-redux';
import { login } from '../../redux/auth/thunks';

// Общие компоненты
// Локальные компоненты
import Login from './LoginForm';


function mapDispatchToProps( dispatch ) {
  return {
    onLogin: (username, password) => {
      dispatch(login(username, password));
    },
  };
}


export default connect(null, mapDispatchToProps)(Login);