import React from 'react';
import PropTypes from "prop-types";
import { Button } from 'antd';

import style from './ButtonGradient.module.scss';


const ButtonGradient = ({ children, ...props }) => (
    <div className={style.container} >
      <Button type="primary" {...props} className={style.customButton} >{children}</Button>
    </div>
  );


ButtonGradient.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

ButtonGradient.defaultProps = {
};

export default ButtonGradient;