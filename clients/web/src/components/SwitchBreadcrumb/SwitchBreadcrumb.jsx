import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

import { Breadcrumb } from 'antd';

import urlConst from '../../App/urlConst';


function createBreadcrumbNameMap(urlTree, urlPrefix='') {
  if(!urlTree) {
    return null;
  }

  let urlNameMap = {};

  Object.keys(urlTree).forEach(key => {
    urlNameMap[urlPrefix+urlTree[key].url] = urlTree[key].title;
  
    const localUrlNameMap = createBreadcrumbNameMap(urlTree[key].menu, urlPrefix+urlTree[key].url);
    
    urlNameMap = { ...urlNameMap,  ...localUrlNameMap };
  });

  return urlNameMap;
}

const urlNameMap = createBreadcrumbNameMap(urlConst);


function SwitchBreadcrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{urlNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/"><HomeOutlined /> Главная</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Breadcrumb  style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
  );
}

SwitchBreadcrumb.propTypes = {
};

SwitchBreadcrumb.defaultProps = {
};

export default SwitchBreadcrumb;