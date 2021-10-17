import React from 'react';
import PropTypes from "prop-types";

import { Tag } from 'antd';

import MakeTable from '../../components/MakeTable/MakeTable';


function WikiTP({ data }) {
  const makeDatat = (outData) => {
    const newData = outData.map((lineData) => {
      const tagDU46 = (lineData.du46) ? 'Du46' : 'NotDu';
      return {
        key: lineData.id,
        id: lineData.id,
        code: lineData.code,
        title: lineData.name,
        tags: [tagDU46,],
      };
    });
    return newData;
  };

  const serializeData = makeDatat(data);

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
        if(a.shortName < b.shortName) { return -1; }
        if(a.shortName > b.shortName) { return 1; }
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
        if(a.shortName < b.shortName) { return -1; }
        if(a.shortName > b.shortName) { return 1; }
        return 0;
      },
      ...addSearch('title'),
    },
    {
      title: 'Тэги',
      dataIndex: 'tags',
      key: 'tags',
      width: 150,
      filters: [
        {
          text: 'Du46',
          value: 'Du46',
        },
        {
          text: 'NotDu',
          value: 'NotDu',
        },
      ],
      onFilter: (value, record) => record.tags.indexOf(value) === 0,
      render: tags => (
        <>
          {tags.map(tag => {
            let color = 'green';
            if (tag === 'Du46') {
              color = 'volcano';
            }
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
      <MakeTable data={serializeData} createColumns={createColumns} />
    </div>
  );
}

WikiTP.propTypes = {
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
};

WikiTP.defaultProps = {
};


export default WikiTP;