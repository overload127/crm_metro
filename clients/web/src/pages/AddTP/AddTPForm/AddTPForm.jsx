import React, { useState } from 'react';
import PropTypes from "prop-types";
import moment from 'moment';
import { Form, Button, DatePicker, Select, Badge, Space, Statistic } from 'antd';
import { InfoCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import {
  toast
} from 'react-toastify';

import style from './AddTPForm.module.scss';

const { RangePicker } = DatePicker;
const { Option } = Select;


const AddTPForm = ({ isCreating, stations, techCards, onCreateTPWorkToServer }) => {
  const [countMinutes, setCountMinutes] = useState(0);

  let optionStations = [];
  let optionTechCards = [];
  

  if(!stations.loading) {
    optionStations = stations.data.map((station)=><Option key={station.id} value={station.id}>{station.name}</Option>);
  }

  if(!stations.loading) {
    optionTechCards = techCards.data.map((techCard)=><Option key={techCard.id} value={techCard.id}>{techCard.code} {techCard.name}</Option>);
  }

  const onFinish = (data) => 
  {
    const datetimeStart = data.datetimeRange[0].format("yyyy-MM-DD HH:mm");
    const datetimeEnd = data.datetimeRange[1].format("yyyy-MM-DD HH:mm");
    onCreateTPWorkToServer(datetimeStart, datetimeEnd, data.station, data.techCards);
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
          <RangePicker showTime onChange={calculateMinutes} style={{ width: '100%' }}/>
        </Form.Item>

        <Form.Item
          label="Отработал минут"
          tooltip={{
            title: 'Рассчитывает количество минут потраченных на работу.',
            icon: <InfoCircleOutlined />,
          }}>
          <Space>
            <Badge count={`${countMinutes} минут`} overflowCount={99999} size="large" style={{ backgroundColor: '#52c41a' }} />
            <Badge count={<ClockCircleOutlined style={{ color: '#52c41a' }}/>} size="large" />
          </Space>
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
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {optionStations}
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
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {optionTechCards}
          </Select>
        </Form.Item>

        <Form.Item {...formItemButton}>
          {
          (!isCreating) ?
            <Button type="primary" htmlType="submit">Добавить выполненную работу</Button>
            :
            <Button type="primary" htmlType="submit" disabled>Добавить выполненную работу</Button>
          }
        </Form.Item>
      </Form>
    </div>
  );
};

AddTPForm.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  stations: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          short_name: PropTypes.string.isRequired,
        })).isRequired,
      PropTypes.array.isRequired,
    ]).isRequired,
  }).isRequired,

  techCards: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          code: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          du46: PropTypes.bool.isRequired,
        })).isRequired,
      PropTypes.array.isRequired,
    ]).isRequired,
  }).isRequired,

  onCreateTPWorkToServer: PropTypes.func.isRequired,
};

AddTPForm.defaultProps = {
};

export default AddTPForm;