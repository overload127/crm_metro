import React, { useState } from 'react';
import PropTypes from "prop-types";


const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const tryLogin = () => {
    onLogin(username, password);
  };

  return (
    <div>
      <p>Форма входа</p>
      <input
        onChange={e => setUsername(e.target.value)}
        value={username}
        type="text"
        placeholder="Логин"
         />
      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Пароль"
        />
      <button type="submit" onClick={tryLogin}>Логин</button>
    </div>
  );
};

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
};

export default LoginForm;