import React from 'react';
import PropTypes from "prop-types";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  toast
} from 'react-toastify';

import style from './LoginForm.module.scss';

const LoginForm = ({ processAuth, onLogin }) => {

  const onFinish = (data) => 
  {
    onLogin(data.login, data.password);
  };

  const onFinishFailed = () => 
  {
    toast.error('Проверьте введенные данные и попробуйте ещё раз', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const formItemLayout = {
    name: "basic",
    labelCol:
    {
      span: 6,
    },
    wrapperCol:
    {
      span: 14
    },
    initialValues: { remember: true },
    onFinishFailed,
    onFinish,
    autoComplete: "off",
  };

  const formItemButton = {
    wrapperCol: {
      sm: { span: 14, offset: 6 },
      xs: { span: 20 },
    }
  };

  return (
    <div>
      <h2>Форма входа</h2>
      <Form {...formItemLayout} className={style.form}>
      <Form.Item
          required
          label="Ваш логин"
          name="login"
          hasFeedback
          help="Логин может состоять из латинских букв и цифр"
          tooltip={{
            title: 'Введите Ваш логин в это поле. Логин может состоять из латинских букв и цифр',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите Ваш логин',
            },
            {
              min: 5,
              message: 'Логин должен содержать не менее 5 символов'
            },
            {
              pattern: /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
              message: 'Обнаружены запрещенные символы'
            },
          ]}
        >
          <Input placeholder="Drovosek1990" prefix={<UserOutlined style={{ fontSize: 13 }} />}/>
        </Form.Item>

        <Form.Item
          required
          label="Ваш пароль"
          name="password"
          hasFeedback
          help="Пароль может состоять из латинских букв и цифр"
          tooltip={{
            title: 'Введите Ваш пароль в это поле. Пароль может состоять из латинских букв и цифр.',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите Ваш пароль!',
            },
            {
              min: 5,
              message: 'Пароль должен содержать не менее 5 символов'
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: 'Обнаружены запрещенные символы'
            },
          ]}
        >
          <Input.Password placeholder="**********" prefix={<LockOutlined style={{ fontSize: 13 }} />}/>
        </Form.Item>

        <Form.Item {...formItemButton}>
          {
            (!processAuth) ?
            <Button type="primary" htmlType="submit">Вход</Button>
            :
            <Button type="primary" htmlType="submit" disabled>Вход <LoadingOutlined /></Button>
          }
        </Form.Item>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  processAuth: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
};

export default LoginForm;