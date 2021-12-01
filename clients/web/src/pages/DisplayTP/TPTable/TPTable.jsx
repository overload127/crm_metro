import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

import { Tag, Space } from 'antd';

import {
  CarryOutTwoTone,
} from '@ant-design/icons';
import MakeTable from '../../../components/MakeTable/MakeTable';

import DeleteButtonConfPopup from './DeleteButtonConfPopup/DeleteButtonConfPopup';

// const softGreen = "#52c41a";
// const softRed = "#eb2f96";

const TPDU46Green = "green";
const TPDU46Volcano = "volcano";

const userOwner = "#95de64";
const userHelp = "#d3adf7";




function TPTable({ TPWorks, currentUser, onDeleteTPWorkData }) {
  const [serializeData, setSerializeData] = useState([]);
  const [typeTagsTechCardsCode, setTypeTagsTechCardsCode] = useState({});
  const [typeStations, setTypeStations] = useState([]);
  const [typeOkolotoks, setTypeOkolotoks] = useState([]);
  const [typeWorkers, setTypeWorkers] = useState([]);
  const { data, isLoading } = TPWorks;

  const makeData = (inData) => {
    const outTypeTagsTechCardsCode = {};
    const outStations = new Set();
    const outOkolotoks = new Set();
    const outWorkers = {};
    const outData = inData.map((lineData) => {
      outStations.add(lineData.stationName);
      outOkolotoks.add(lineData.okolotokName);
      const techCardsCode = [];
      lineData.techCards.forEach((techCard) => {
        techCardsCode.push(techCard.code);

        outTypeTagsTechCardsCode[techCard.code] = {
          text: techCard.code,
          value: techCard.code,
          color: (techCard.du46) ? TPDU46Volcano : TPDU46Green,
        };
      });

      const workers = [];
      lineData.users.forEach((user)=>{
        workers.push(user.firstName);
        outWorkers[user.firstName] = {
          firstName: user.firstName,
          color: (user.id === currentUser.id) ? userOwner : userHelp,
        };
      });

      workers.sort((a, b) => {
        if(a === currentUser.firstName) { return -1; }
        if(b === currentUser.firstName) { return 1; }
        return 0;
      });

      return {
        ...lineData,
        key: lineData.id,
        datetimeStart: (moment(lineData.datetimeStart)).format("YYYY-MM-DD HH:mm"),
        datetimeEnd: (moment(lineData.datetimeEnd)).format("YYYY-MM-DD HH:mm"),
        duration: lineData.duration,
        techCardsCode,
        stationName: lineData.stationName,
        subdivision: lineData.subdivision,
        note: lineData.note,
        owner: (lineData.users.map((user)=>user.id).includes(currentUser.id)) ? <CarryOutTwoTone twoToneColor={userOwner} /> : <CarryOutTwoTone twoToneColor={userHelp}/>,
        workers,
        okolotokName: lineData.okolotokName,
        buttonDelete: lineData.id,
        blockButtonDelete: lineData.isDeleting,
      };
    });
    return {
      outData,
      outTypeTagsTechCardsCode,
      outStations,
      outWorkers,
      outOkolotoks
    };
  };

  useEffect(() => {
    if(data) {
      const {outData, outTypeTagsTechCardsCode, outStations, outWorkers, outOkolotoks} = makeData(data);
      setSerializeData(outData);

      setTypeTagsTechCardsCode({
        ...outTypeTagsTechCardsCode,
      });

      setTypeStations([
        ...outStations,
      ]);

      setTypeWorkers({
        ...outWorkers,
      });

      setTypeOkolotoks([
        ...outOkolotoks,
      ]);
    }
  }, [data]);

  const createColumns = (addSearch) => [
    {
      title: 'Твой',
      dataIndex: 'owner',
      key: 'owner',
      width: 50,
      minWidth: 50,
      maxWidth: 50,
    },
    {
      title: 'Начало',
      dataIndex: 'datetimeStart',
      key: 'datetimeStart',
      width: 150,
      minWidth: 150,
      maxWidth: 150,
      sorter: (a, b) => {
        if(a.datetimeStart < b.datetimeStart) { return -1; }
        if(a.datetimeStart > b.datetimeStart) { return 1; }
        return 0;
      },
      defaultSortOrder: 'descend',
    },
    {
      title: 'Конец',
      dataIndex: 'datetimeEnd',
      key: 'datetimeEnd',
      width: 150,
      minWidth: 150,
      maxWidth: 150,
      sorter: (a, b) => {
        if(a.datetimeEnd < b.datetimeEnd) { return -1; }
        if(a.datetimeEnd > b.datetimeEnd) { return 1; }
        return 0;
      },
    },
    {
      title: 'Длитель-ность',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      sorter: (a, b) => {
        if(a.duration < b.duration) { return -1; }
        if(a.duration > b.duration) { return 1; }
        return 0;
      },
    },
    {
      title: 'Работы',
      dataIndex: 'techCardsCode',
      key: 'techCardsCode',
      width: 220,
      minWidth: 220,
      maxWidth: 220,
      filters: Object.keys(typeTagsTechCardsCode).map((key) => ({
          text: key,
          value: key
        })),
      onFilter: (value, record) => record.techCardsCode.indexOf(value) !== -1,
      render: tags => (
        <Space wrap>
          {tags.map(tag => {
            const {color} = typeTagsTechCardsCode[tag];
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </Space>
      ),
    },
    {
      title: 'Станция',
      dataIndex: 'stationName',
      key: 'stationName',
      width: 150,
      sorter: (a, b) => {
        if(a.stationName < b.stationName) { return -1; }
        if(a.stationName > b.stationName) { return 1; }
        return 0;
      },
      filters: typeStations.map((item) => ({
        text: item,
        value: item
      })),
      onFilter: (value, record) => record.stationName.indexOf(value) !== -1,
    },
    {
      title: 'Исполнители',
      dataIndex: 'workers',
      key: 'workers',
      width: 220,
      minWidth: 220,
      maxWidth: 220,
      filters: Object.keys(typeWorkers).map((key) => ({
        text: key,
        value: key
      })),
      onFilter: (value, record) => record.workers.indexOf(value) !== -1,
      render: tags => (
        <Space wrap>
          {tags.map(tag => {
            const {color} = typeWorkers[tag];
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </Space>
        ),
    },
    {
      title: 'Околоток',
      dataIndex: 'okolotokName',
      key: 'okolotokName',
      width: 100,
      sorter: (a, b) => {
        if(a.okolotokName < b.okolotokName) { return -1; }
        if(a.okolotokName > b.okolotokName) { return 1; }
        return 0;
      },
      filters: typeOkolotoks.map((item) => ({
        text: item,
        value: item
      })),
      onFilter: (value, record) => record.okolotokName.indexOf(value) !== -1,
    },
    {
      title: 'Организация',
      dataIndex: 'subdivision',
      key: 'subdivision',
      width: 150,
      minWidth: 150,
      sorter: (a, b) => {
        if(a.subdivision < b.subdivision) { return -1; }
        if(a.subdivision > b.subdivision) { return 1; }
        return 0;
      },
      ...addSearch('subdivision'),
    },
    {
      title: 'Примечание',
      dataIndex: 'note',
      key: 'note',
      // width: 100,
      // minWidth: 100,
      sorter: (a, b) => {
        if(a.note < b.note) { return -1; }
        if(a.note > b.note) { return 1; }
        return 0;
      },
      ...addSearch('note'),
    },
    {
      title: 'Кнопка удаления',
      dataIndex: 'buttonDelete',
      key: 'buttonDelete',
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      render: (id, record) => (
          <DeleteButtonConfPopup onClickHideBtn={() => onDeleteTPWorkData(id)} isBlockHideBtn={record.blockButtonDelete} />
        ),
    },
  ];

  return (
    <div>
      <p>Все варианты техпроцессов в виде таблицы</p>
      <MakeTable data={serializeData} createColumns={createColumns} tableWidth={1600} loading={isLoading} />
    </div>
  );
}

// Нужно правильно обозначать пустой список или с объектом.
TPTable.propTypes = {
  TPWorks: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          datetimeStart: PropTypes.instanceOf(moment).isRequired,
          datetimeEnd: PropTypes.instanceOf(moment).isRequired,
          note: PropTypes.string.isRequired,
          subdivision: PropTypes.string.isRequired,
          stationName: PropTypes.string.isRequired,
          techCardsCode: PropTypes.string.isRequired,
          users: PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
          }).isRequired,
          okolotokName: PropTypes.string.isRequired,
        })).isRequired,
      PropTypes.array.isRequired,
    ]).isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    okolotok: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    userProfileId: PropTypes.number.isRequired,
  }).isRequired,
  onDeleteTPWorkData: PropTypes.func.isRequired,
};

TPTable.defaultProps = {
};


export default TPTable;