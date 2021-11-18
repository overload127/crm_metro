import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

import MakeTable from '../../components/MakeTable/MakeTable';


function WikiUserProfile({ isLoading, data }) {
  const [serializeData, setSerializeData] = useState([]);
  const makeData = (outData) => {
    const newData = outData.map((lineData) => ({
        key: lineData.id,
        id: lineData.id,
        name: lineData.name,
        shortName: lineData.shortName,
        description: lineData.description,
      }));
    return newData;
  };

  useEffect(() => {
    if(data) {
      const outData = makeData(data);
      setSerializeData(outData);
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
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: (a, b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      },
      ...addSearch('name'),
    },
    {
      title: 'Сокращение',
      dataIndex: 'shortName',
      key: 'shortName',
      width: 100,
      sorter: (a, b) => {
        if(a.shortName < b.shortName) { return -1; }
        if(a.shortName > b.shortName) { return 1; }
        return 0;
      },
      ...addSearch('shortName'),
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      sorter: (a, b) => {
        if(a.description < b.description) { return -1; }
        if(a.description > b.description) { return 1; }
        return 0;
      },
      ...addSearch('description'),
    },
  ];

  return (
    <div>
      <p>Все инструменты в виде таблицы</p>
      <MakeTable data={serializeData} createColumns={createColumns} tableWidth={500} loading={isLoading} />
    </div>
  );
}

WikiUserProfile.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        shortName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })).isRequired,
    PropTypes.array.isRequired,
  ]).isRequired,
};

WikiUserProfile.defaultProps = {
};

export default WikiUserProfile;