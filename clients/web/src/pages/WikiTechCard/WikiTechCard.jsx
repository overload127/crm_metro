import React, { useEffect, useState }from 'react';
import PropTypes from "prop-types";

import { Tag } from 'antd';

import MakeTable from '../../components/MakeTable/MakeTable';


function WikiTechCard({ isLoading, data }) {
  const [serializeData, setSerializeData] = useState([]);
  const [typeTagsAll, setTypeTagsAll] = useState({});

  const makeData = (inData) => {
    const outTypeTagsAll = {};
    const outData = inData.map((lineData) => {
      const tagDU46 = (lineData.du46) ? 'ДУ' : 'Без ДУ';
      const tagOrder = (lineData.order) ? 'ЖР' : 'Без ЖР';
      const tagPafu= (lineData.pafu) ? 'ПАФУ' : 'Без ПАФУ';
      const tagJtp = (lineData.jtp) ? 'ЖТП' : 'Без ЖТП';
      lineData.devicesForWork.forEach((device) => {outTypeTagsAll[device] = {
        text: device,
        value: device,
        color: 'blue'
      };});
      return {
        key: lineData.id,
        id: lineData.id,
        code: lineData.code,
        title: lineData.name,
        tags: [tagDU46, tagOrder, tagPafu, tagJtp, ...lineData.devicesForWork],
      };
    });

    return {
      outData,
      outTypeTagsAll
    };
  };

  useEffect(() => {
    if(data) {
      const {outData, outTypeTagsAll} = makeData(data);
      outTypeTagsAll['ДУ'] = {
        text: 'ДУ',
        value: 'ДУ',
        color: 'volcano'
      };
      outTypeTagsAll['Без ДУ'] = {
        text: 'Без ДУ',
        value: 'Без ДУ',
        color: 'green'
      };
      outTypeTagsAll['ЖР'] = {
        text: 'ЖР',
        value: 'ЖР',
        color: 'volcano'
      };
      outTypeTagsAll['Без ЖР'] = {
        text: 'Без ЖР',
        value: 'Без ЖР',
        color: 'green'
      };
      outTypeTagsAll['ПАФУ'] = {
        text: 'ПАФУ',
        value: 'ПАФУ',
        color: 'volcano'
      };
      outTypeTagsAll['Без ПАФУ'] = {
        text: 'Без ПАФУ',
        value: 'Без ПАФУ',
        color: 'green'
      };
      outTypeTagsAll['ЖТП'] = {
        text: 'ЖТП',
        value: 'ЖТП',
        color: 'volcano'
      };
      outTypeTagsAll['Без ЖТП'] = {
        text: 'Без ЖТП',
        value: 'Без ЖТП',
        color: 'green'
      };

      setSerializeData(outData);

      setTypeTagsAll({
        ...typeTagsAll,
        ...outTypeTagsAll,
      });
    }
  }, [data]);

  const createColumns = (addSearch) => [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
      width: 100,
      sorter: (a, b) => {
        if(a.code < b.code) { return -1; }
        if(a.code > b.code) { return 1; }
        return 0;
      },
      ...addSearch('code'),
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      sorter: (a, b) => {
        if(a.title < b.title) { return -1; }
        if(a.title > b.title) { return 1; }
        return 0;
      },
      ...addSearch('title'),
    },
    {
      title: 'Тэги',
      dataIndex: 'tags',
      key: 'tags',
      width: 150,
      filters: Object.keys(typeTagsAll).map((key) => ({
          text: key,
          value: key
        })),
      onFilter: (value, record) => record.tags.indexOf(value) !== -1,
      render: tags => (
        <>
          {tags.map(tag => {
            const {color} = typeTagsAll[tag];
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <div>
      <p>Все варианты техпроцессов в виде таблицы</p>
      <MakeTable data={serializeData} createColumns={createColumns} tableWidth={500} loading={isLoading} />
    </div>
  );
}

WikiTechCard.propTypes = {
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
};

WikiTechCard.defaultProps = {
};


export default WikiTechCard;