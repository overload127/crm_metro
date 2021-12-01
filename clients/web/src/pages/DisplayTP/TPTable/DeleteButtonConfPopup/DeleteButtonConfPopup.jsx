
import React, { useState } from 'react';
import PropTypes from "prop-types";

import { Popconfirm } from 'antd';

import {
  UnlockOutlined,
} from '@ant-design/icons';

import ButtonGradient from '../../../../components/Buttons/ButtonGradient/ButtonGradient';

import DeleteButton from './DeleteButton/DeleteButton';


const DeleteButtonConfPopup = ({ isBlockHideBtn, onClickHideBtn }) => {
  const [confirm, setConfirm] = useState(false);

  const offConfirm = () => {
    setConfirm(false);
  };

  const onConfirm = () => {
    setConfirm(true);
    setTimeout(offConfirm, 20000);
  };

  return (
    <>
    {
      (confirm) ?
        <DeleteButton onClick={onClickHideBtn} isBlock={isBlockHideBtn} />
        :
        <Popconfirm
          title="Подтвердите действие"
          onConfirm={onConfirm}
          okText="Да"
          cancelText="Нет"
        >
          <ButtonGradient><UnlockOutlined /></ButtonGradient>
        </Popconfirm>
    }
    </>
  );
};

DeleteButtonConfPopup.propTypes = {
  isBlockHideBtn: PropTypes.bool.isRequired,
  onClickHideBtn: PropTypes.func.isRequired,
};

DeleteButtonConfPopup.defaultProps = {
};

export default DeleteButtonConfPopup;