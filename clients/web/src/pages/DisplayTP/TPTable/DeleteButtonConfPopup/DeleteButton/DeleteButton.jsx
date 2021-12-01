
import React from 'react';
import PropTypes from "prop-types";

import { Button } from 'antd';

import {
  DeleteOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import style from './DeleteButton.module.scss';


const DeleteButton = ({ isBlock, onClick }) => (
    <div className={style.container} >
      {
        (isBlock) ?
        <Button disabled type="primary" htmlType="button" className={style.mybtn} >
          <LoadingOutlined style={{color: '#000000'}}/>
        </Button>
        :
        <Button type="primary" htmlType="button" className={style.mybtn} onClick={onClick} >
          <DeleteOutlined />
        </Button>
      }
    </div>
  );

DeleteButton.propTypes = {
  isBlock: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

DeleteButton.defaultProps = {
};

export default DeleteButton;