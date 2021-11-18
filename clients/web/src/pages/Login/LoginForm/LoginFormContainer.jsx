import { connect } from 'react-redux';
import { login } from '../../../redux/auth/thunks';


// Общие компоненты
// Локальные компоненты
import LoginForm from './LoginForm';


function mapStateToProps( state ) {
  return {
    processAuth: state.auth.processAuth,
  };
}

function mapDispatchToProps( dispatch ) {
  return {
    onLogin: (username, password, capcha) => {
      dispatch(login(username, password, capcha));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);