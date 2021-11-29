import React, { useState } from 'react';
import PropTypes from "prop-types";
import moment from 'moment';
import { Form, Button, DatePicker, Select, Space, Statistic, Popconfirm } from 'antd';
import { InfoCircleOutlined, ClockCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  toast
} from 'react-toastify';

import ButtonGradient from '../../../components/Buttons/ButtonGradient/ButtonGradient';

import style from './AddTPForm.module.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;

const format = 'yyyy-MM-DD HH:mm';

const AddTPForm = ({ isCreating, isLoadingWiki, stations, okolotoks, users, techCards, onCreateTPWorkToServer }) => {
  const [confirm, setConfirm] = useState(false);
  const [countMinutes, setCountMinutes] = useState(0);
  let optionStations = [];

  if(!stations.isLoading) {
    optionStations = stations.data.map((station)=><Option key={station.id} value={String(station.id)}>{station.name}</Option>);
  }

  let optionOkolotoks = [];

  if(!okolotoks.isLoading) {
    optionOkolotoks = okolotoks.data.map((okolotok)=><Option key={okolotok.id} value={String(okolotok.id)}>{okolotok.name}</Option>);
  }

  let optionUserProfiles = [];

  if(!users.isLoading) {
    optionUserProfiles = users.data.map((user)=><Option key={user.profileId} value={String(user.profileId)}>{user.firstName}</Option>);
  }

  let optionTechCards = [];

  if(!techCards.isLoading) {
    optionTechCards = techCards.data.map((techCard)=><Option key={techCard.id} value={String(techCard.id)}>{techCard.code}</Option>);
  }

  const onFinish = (data) => 
  {
    const datetimeStart = data.datetimeRange[0].format("yyyy-MM-DD HH:mm");
    const datetimeEnd = data.datetimeRange[1].format("yyyy-MM-DD HH:mm");
    onCreateTPWorkToServer(datetimeStart, datetimeEnd, data.station, data.techCards, data.okolotok, data.userProfile);
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

  const calculateMinutes = (dates) => {
    const datetimeStart = dates[0];
    const datetimeEnd = dates[1];
    const diff = moment.duration(datetimeEnd.diff(datetimeStart));
    const minutes = diff.asMinutes();
    setCountMinutes(Math.round(minutes) || 'Нет данных');
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

  const offConfirm = () => {
    setConfirm(false);
  };

  const onConfirm = () => {
    setConfirm(true);
    setTimeout(offConfirm, 20000);
  };

  return (
    <div>
      <h2>Форма добавления выполненых работ</h2>
      <Form {...formItemLayout} className={style.form}>
        <Form.Item
          required
          label="Дата и время начала"
          name="datetimeRange"
          hasFeedback
          help="Выберите начало и окончание выполнения работы"
          tooltip={{
            title: 'Укажите время начала выполнения техпроцесса и время окончания. Сначала выберите дату и время начала. Далее выберите дату и время окончания работы.',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выберите диапазон',
            },
          ]}
        >
          <RangePicker showTime onChange={calculateMinutes} style={{ width: '100%' }} format={format} showNow placeholder={["Дата начала", "Дата окончания"]} />
        </Form.Item>

        <Form.Item
          label="Отработал минут"
          tooltip={{
            title: 'Рассчитывает количество минут потраченных на работу.',
            icon: <InfoCircleOutlined />,
          }}>
          <Space>
            <Statistic value={`${countMinutes} минут`} suffix={<ClockCircleOutlined style={{ color: '#52c41a' }}/>} />
          </Space>
        </Form.Item>
        
        <Form.Item
          required
          label="Станция"
          name="station"
          hasFeedback
          help="Выберите станцию"
          tooltip={{
            title: 'Выберите станцию на которой производили техпроцесс.',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выберите станцию!',
            },
          ]}
        >
          <Select 
            showSearch
            allowClear
            placeholder="Выберите станцию"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {optionStations}
          </Select>
        </Form.Item>

        <Form.Item
          label="Околоток"
          name="okolotok"
          hasFeedback
          help="Выберите околоток"
          tooltip={{
            title: 'Выберите оклоток для привязки к нему работы. Можно выбрать "Нет околотка".',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выберите оклоток!',
            },
          ]}
        >
          <Select 
            showSearch
            allowClear
            placeholder="Выберите оклоток"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {optionOkolotoks}
          </Select>
        </Form.Item>

        <Form.Item
          label="Сотрудники"
          name="userProfile"
          hasFeedback
          help="Выберите сотрудников участвующих в работе"
          tooltip={{
            title: 'Выберите сотрудников что бы указать кто выполнял работу',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выберите сотрудников!',
            },
          ]}
        >
          <Select 
            mode="multiple"
            showSearch
            allowClear
            placeholder="Выберите сотрудников"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {optionUserProfiles}
          </Select>
        </Form.Item>

        <Form.Item
          required
          label="Выполненые ТП"
          name="techCards"
          hasFeedback
          help="Выберите выполненые техпроцессы"
          tooltip={{
            title: 'Выберите выполненые техпроцессы.',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выберите не меньше одного техпроцесса!',
            },
          ]}
        >
          <Select 
            showSearch
            allowClear
            placeholder="Выберите техпроцесс"
            mode="tags"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {optionTechCards}
          </Select>
        </Form.Item>

        {
        (confirm) ?
          <Form.Item {...formItemButton}>
            {
            (!(isCreating || isLoadingWiki)) ?
              <Button type="primary" htmlType="submit">Добавить выполненную работу</Button>
              :
              <Button type="primary" htmlType="submit" disabled>Добавить выполненную работу <LoadingOutlined /></Button>
            }
          </Form.Item>
          :
          <Form.Item {...formItemButton}>
            <Popconfirm
              title="Подтвердите действие"
              onConfirm={onConfirm}
              okText="Да"
              cancelText="Нет"
            >
              <ButtonGradient>Разблокировать действие</ButtonGradient>
            </Popconfirm>
          </Form.Item>
          }
      </Form>
    </div>
  );
};

AddTPForm.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isLoadingWiki: PropTypes.bool.isRequired,
  stations: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          shortName: PropTypes.string.isRequired,
        })).isRequired,
      PropTypes.array.isRequired,
    ]).isRequired,
  }).isRequired,
  okolotoks: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        })).isRequired,
      PropTypes.array.isRequired,
    ]).isRequired,
  }).isRequired,
  users: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          firstName: PropTypes.string.isRequired,
          profileId: PropTypes.number.isRequired,
          okolotokId: PropTypes.number.isRequired,
          okolotokName: PropTypes.string.isRequired,
        })).isRequired,
      PropTypes.array.isRequired,
    ]).isRequired,
  }).isRequired,
  techCards: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          code: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          du46: PropTypes.bool.isRequired,
          order: PropTypes.bool.isRequired,
          devicesForWork: PropTypes.oneOfType([
            PropTypes.arrayOf(
              PropTypes.string).isRequired,
            PropTypes.array.isRequired,
          ]).isRequired,
        })).isRequired,
    ]).isRequired,
  }).isRequired,

  onCreateTPWorkToServer: PropTypes.func.isRequired,
};

AddTPForm.defaultProps = {
};

export default AddTPForm;