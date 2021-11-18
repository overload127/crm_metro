import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

import MakeTable from '../../components/MakeTable/MakeTable';


function WikiUserProfile({ isLoading, data }) {
  const [serializeData, setSerializeData] = useState([]);
  const makeData = (outData) => {
    const newData = outData.map((lineData) => ({
        key: lineData.id,
        id: lineData.id,
        firstName: lineData.firstName,
        okolotokName: lineData.okolotokName,
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
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
      width: 100,
      sorter: (a, b) => {
        if(a.firstName < b.firstName) { return -1; }
        if(a.firstName > b.firstName) { return 1; }
        return 0;
      },
      ...addSearch('firstName'),
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
      ...addSearch('okolotokName'),
    },
  ];

  return (
    <div>
      <p>Все сотрудников в виде таблицы</p>
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
        firstName: PropTypes.string.isRequired,
        profileId: PropTypes.number.isRequired,
        okolotokId: PropTypes.number.isRequired,
        okolotokName: PropTypes.string.isRequired,
      })).isRequired,
    PropTypes.array.isRequired,
  ]).isRequired,
};

WikiUserProfile.defaultProps = {
};

export default WikiUserProfile;