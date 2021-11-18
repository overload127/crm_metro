import React from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

import { Form, Button, DatePicker, Select } from 'antd';
import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons';

import style from './FormTPRequest.module.scss';

const { Option } = Select;

function FormTPRequest({ isLoadingWiki, TPWorksisLoading, stations, okolotoks, users, techCards, onLoadTPWorkData }) {
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

  const optionBool = [
    {
      id: 0,
      lable: 'Все',
      value: 'all',
    },
    {
      id: 1,
      lable: 'Да',
      value: 'true',
    },
    {
      id: 2,
      lable: 'Нет',
      value: 'false',
    },
  ].map((variant)=><Option key={variant.id} value={String(variant.value)}>{variant.lable}</Option>);

  const onFinish = (data) => 
  {
    let inDateStart = moment().startOf('month').format('YYYY-MM-DD');
    let inDateEnd = moment().endOf('month').format('YYYY-MM-DD');
    let inStationId = null;
    let inOkolotokId = null;
    let inUserProfiles = [];
    let inTechCards = [];
    let inTypeDU46 = 'all';
    let inTypeOrder = 'all';
    let inTypePafu = 'all';
    let inTypeJtp = 'all';

    if(data.dateStart) {
      inDateStart = data.dateStart.format('YYYY-MM-DD');
    }
    if(data.dateEnd) {
      inDateEnd = data.dateEnd.format('YYYY-MM-DD');
    }
    if(data.station) {
      inStationId = data.station;
    }
    if(data.okolotok) {
      inOkolotokId = data.okolotok;
    }
    if(data.userProfile) {
      inUserProfiles = data.userProfile;
    }
    if(data.techCards) {
      inTechCards = data.techCards;
    }
    if(data.du46) {
      inTypeDU46 = data.du46;
    }
    if(data.order) {
      inTypeOrder = data.order;
    }
    if(data.pafu) {
      inTypePafu = data.pafu;
    }
    if(data.jtp) {
      inTypeJtp = data.jtp;
    }

    onLoadTPWorkData(inDateStart, inDateEnd, inOkolotokId, inStationId, inUserProfiles, inTypeDU46, inTypeOrder, inTypePafu, inTypeJtp, inTechCards);
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
      <p>Форма запроса данных</p>
      <Form {...formItemLayout} className={style.form}>
        <Form.Item
          label="От"
          name="dateStart"
          hasFeedback
          help="Выберите начало периода"
          tooltip={{
            title: 'Укажите дату начала периода. Пустое значение эквивалентно началу месяца.',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: 'Укажите дату начала периода',
            },
          ]}
        >
          <DatePicker onChange={()=>console.log('1')} style={{ width: '100%' }}/>
        </Form.Item>

        <Form.Item
          label="До"
          name="dateEnd"
          hasFeedback
          help="Выберите окончание периода"
          tooltip={{
            title: 'Укажите дату окончания периода. Пустое значение эквивалентно концу месяца.',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: 'Укажите дату окончания периода',
            },
          ]}
        >
          <DatePicker onChange={()=>console.log('1')} style={{ width: '100%' }}/>
        </Form.Item>

        <Form.Item
          label="Станция"
          name="station"
          hasFeedback
          help="Выберите станцию"
          tooltip={{
            title: 'Выберите станцию для фильтрации техпроцесов. Пустое значение равно выбору всех станций.',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
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
            title: 'Выберите оклоток для фильтрации техпроцесов. Пустое значение равно выбору всех околотков.',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
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
          help="Выберите сотрудников"
          tooltip={{
            title: 'Выберите сотрудников для фильтрации техпроцесов. Пустое значение равно выбору всех сотрудников.',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
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
          label="Техкарты"
          name="techCards"
          hasFeedback
          help="Выберите техкарты"
          tooltip={{
            title: 'Выберите техкарты для фильтрации техпроцесов. Пустое значение равно выбору всех техкарт.',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: 'Пожалуйста, выберите техкарты!',
            },
          ]}
        >
          <Select 
            mode="multiple"
            showSearch
            allowClear
            placeholder="Выберите техкарты"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {optionTechCards}
          </Select>
        </Form.Item>

        <Form.Item
          label="Фильтр по журналу ДУ46"
          name="du46"
          hasFeedback
          help="Выберите вариант"
          tooltip={{
            title: 'Выберите вариант для фильтрации техпроцесов. Пустое значение равно выбору "Все".',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: 'Пожалуйста, выберите вариант!',
            },
          ]}
        >
          <Select 
            showSearch
            allowClear
            placeholder="Выберите вариант"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {optionBool}
          </Select>
        </Form.Item>

        <Form.Item
          label="Фильтр по журналу ЖР"
          name="order"
          hasFeedback
          help="Выберите вариант"
          tooltip={{
            title: 'Выберите вариант для фильтрации техпроцесов. Пустое значение равно выбору "Все".',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: 'Пожалуйста, выберите вариант!',
            },
          ]}
        >
          <Select 
            showSearch
            allowClear
            placeholder="Выберите вариант"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {optionBool}
          </Select>
        </Form.Item>

        <Form.Item
          label="Фильтр по журналу ПАФУ"
          name="pafu"
          hasFeedback
          help="Выберите вариант"
          tooltip={{
            title: 'Выберите вариант для фильтрации техпроцесов. Пустое значение равно выбору "Все".',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: 'Пожалуйста, выберите вариант!',
            },
          ]}
        >
          <Select 
            showSearch
            allowClear
            placeholder="Выберите вариант"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {optionBool}
          </Select>
        </Form.Item>

        <Form.Item
          label="Фильтр по журналу ЖТП"
          name="jtp"
          hasFeedback
          help="Выберите вариант"
          tooltip={{
            title: 'Выберите вариант для фильтрации техпроцесов. Пустое значение равно выбору "Все".',
            icon: <InfoCircleOutlined />,
          }}
          rules={[
            {
              required: false,
              message: 'Пожалуйста, выберите вариант!',
            },
          ]}
        >
          <Select 
            showSearch
            allowClear
            placeholder="Выберите вариант"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {optionBool}
          </Select>
        </Form.Item>

        <Form.Item {...formItemButton}>
            {
            (!( TPWorksisLoading || isLoadingWiki )) ?
              <Button type="primary" htmlType="submit">Запросить данные</Button>
              :
              <Button type="primary" htmlType="submit" disabled>Запросить данные <LoadingOutlined /></Button>
            }
          </Form.Item>
      </Form>
    </div>
  );
}

FormTPRequest.propTypes = {
  isLoadingWiki: PropTypes.bool.isRequired,
  TPWorksisLoading: PropTypes.bool.isRequired,
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
  onLoadTPWorkData: PropTypes.func.isRequired,
};

FormTPRequest.defaultProps = {
};

export default FormTPRequest;