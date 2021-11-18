import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

import MakeTable from '../../components/MakeTable/MakeTable';


function WikiStation({ isLoading, data }) {
  const [serializeData, setSerializeData] = useState([]);
  const makeData = (outData) => {
    const newData = outData.map((lineData) => ({
        key: lineData.id,
        id: lineData.id,
        name: lineData.name,
        shortName: lineData.shortName,
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
      title: 'Полное название',
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
      title: 'Короткое название',
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
  ];

  return (
    <div>
      <p>Все варианты техпроцессов в виде таблицы</p>
      <MakeTable data={serializeData} createColumns={createColumns} tableWidth={500} loading={isLoading} />
    </div>
  );
}

WikiStation.propTypes = {
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
};

WikiStation.defaultProps = {
};

export default WikiStation;