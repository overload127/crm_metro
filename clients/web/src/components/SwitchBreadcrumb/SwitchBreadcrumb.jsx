import React from 'react';
import { Link, useLocation} from 'react-router-dom';

import { Breadcrumb } from 'antd';

const breadcrumbNameMap = {
  '/wiki': 'wiki',
  '/public': 'public',
  '/private': 'private',
  '/login': 'login',
  '/logout': 'logout',
};

function SwitchBreadcrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
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