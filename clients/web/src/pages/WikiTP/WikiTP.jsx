import React from 'react';
import PropTypes from "prop-types";

import { Table, Tag, Input, Button, Space } from 'antd';

import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


class TestTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) => {
      const { searchedColumn, searchText} = this.state;
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      );
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  createColumns = () => [
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
        ...this.getColumnSearchProps('code'),
      },
      {
        title: 'Название',
        dataIndex: 'title',
        key: 'title',
        ...this.getColumnSearchProps('code'),
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
    ]

  render() {
    const { data } = this.props;
    const columns = this.createColumns(); 
    return <Table columns={columns} dataSource={data} bordered sticky pagination={{ pageSize: 50, position: ['topCenter', 'bottomCenter'] }} scroll={{ x: true }} />;
  }
}

TestTable.propTypes = {
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

TestTable.defaultProps = {
};


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

  return (
    <div>
      <p>Все варианты техпроцессов в виде таблицы</p>
      <TestTable data={serializeData} />
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