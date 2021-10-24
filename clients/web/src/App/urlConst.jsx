import React from 'react';

import {
  QuestionCircleOutlined
} from '@ant-design/icons';
import PageMain from '../pages/Main/Main';
import PageWiki from '../pages/Wiki/Wiki';
import PageWikiTP from '../pages/WikiTechCard/WikiTechCardContainer';
import PageWikiStation from '../pages/WikiStation/WikiStationContainer';
import PageActions from '../pages/Actions/Actions';
import PageAddTP from '../pages/AddTP/AddTP';

import PageLogin from '../pages/Login/Login';
import PageLogout from '../pages/Logout/Logout';

import Priv from '../pages/Private/Private';
import Pub from '../pages/Public/Public';



export const PERMISSION_PUBLIC = 'publicItem';
export const PERMISSION_GUEST = 'guestItem';
export const PERMISSION_PRIVATE = 'privateItem';


const urlConst = {
  PAGE_HOME: {
    url: '/',
    title: 'Главная',
    permission: PERMISSION_PUBLIC,
    exact: true,
    component: PageMain,
    icon: null,
    menu: null,
  },
  PAGE_PUBLIC: {
    url: '/public',
    title: 'Public',
    permission: PERMISSION_PUBLIC,
    exact: true,
    component: Pub,
    icon: null,
    menu: null,
  },
  PAGE_WIKI: {
    url: '/wiki',
    title: 'Wiki',
    permission: PERMISSION_PUBLIC,
    exact: true,
    component: PageWiki,
    icon: <QuestionCircleOutlined />,
    menu: {
      PAGE_WIKI_TP: {
        url: '/tp',
        title: 'ТП',
        permission: PERMISSION_PUBLIC,
        exact: true,
        component: PageWikiTP,
        icon: null,
        menu: null,
      },
      PAGE_WIKI_STATION: {
        url: '/station',
        title: 'Станции',
        permission: PERMISSION_PUBLIC,
        exact: true,
        component: PageWikiStation,
        icon: null,
        menu: null,
      },
    },
  },
  PAGE_ACTIONS: {
    url: '/actions',
    title: 'Действия',
    permission: PERMISSION_PRIVATE,
    exact: true,
    component: PageActions,
    icon: null,
    menu: {
      PAGE_ADD_TP: {
        url: '/add_tp',
        title: 'Добавить ТП',
        permission: PERMISSION_PRIVATE,
        exact: true,
        component: PageAddTP,
        menu: null,
      },
    },
  },
  PAGE_PRIVATE: {
    url: '/private',
    title: 'Private',
    permission: PERMISSION_PRIVATE,
    exact: true,
    component: Priv,
    icon: null,
    menu: null,
  },
  PAGE_LOGIN: {
    url: '/login',
    title: 'Вход',
    permission: PERMISSION_GUEST,
    exact: true,
    component: PageLogin,
    icon: null,
    menu: null,
  },
  PAGE_LOGOUT: {
    url: '/logout',
    title: 'Выход',
    permission: PERMISSION_PRIVATE,
    exact: true,
    component: PageLogout,
    icon: null,
    menu: null,
  },
};


export default urlConst;