import React from 'react';

import {
  QuestionCircleOutlined
} from '@ant-design/icons';
import PageMain from '../pages/Main/Main';

import PageWiki from '../pages/Wiki/Wiki';
import PageWikiTP from '../pages/WikiTechCard/WikiTechCardContainer';
import PageWikiStation from '../pages/WikiStation/WikiStationContainer';
import PageWikiUserProfile from '../pages/WikiUserProfile/WikiUserProfileContainer';
import PageWikiDeviceForWork from '../pages/WikiDeviceForWork/WikiDeviceForWorkContainer';
import PageWikiOkolotok from '../pages/WikiOkolotok/WikiOkolotokContainer';

import PageServices from '../pages/Services/Services';
import PageAddTP from '../pages/AddTP/AddTP';
import PageDisplayTP from '../pages/DisplayTP/DisplayTPContainer';

import PageLogin from '../pages/Login/Login';
import PageLogout from '../pages/Logout/Logout';

// import Priv from '../pages/Private/Private';
// import Pub from '../pages/Public/Public';


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
  PAGE_SERVICES: {
    url: '/services',
    title: 'Сервисы',
    permission: PERMISSION_PRIVATE,
    exact: true,
    component: PageServices,
    icon: null,
    menu: {
      PAGE_TP_WORKS: {
        url: '/tp_works',
        title: 'Записи ТП',
        permission: PERMISSION_PRIVATE,
        exact: true,
        component: PageServices,
        icon: null,
        menu: {
          PAGE_ADD_TP: {
            url: '/add',
            title: 'Добавить ТП',
            permission: PERMISSION_PRIVATE,
            exact: true,
            component: PageAddTP,
            menu: null,
          },
          DISPLAY_TP: {
            url: '/display_request',
            title: 'Конструктор запросов',
            permission: PERMISSION_PRIVATE,
            exact: true,
            component: PageDisplayTP,
            menu: null,
          },
        },
      },
      PAGE_WIKI: {
        url: '/wiki',
        title: 'Wiki',
        permission: PERMISSION_PRIVATE,
        exact: true,
        component: PageWiki,
        icon: <QuestionCircleOutlined />,
        menu: {
          PAGE_WIKI_USERPROFILE: {
            url: '/profile',
            title: 'Сотрудники',
            permission: PERMISSION_PRIVATE,
            exact: true,
            component: PageWikiUserProfile,
            icon: null,
            menu: null,
          },
          PAGE_WIKI_DEVICE_FOR_WORK: {
            url: '/device',
            title: 'Инструменты',
            permission: PERMISSION_PRIVATE,
            exact: true,
            component: PageWikiDeviceForWork,
            icon: null,
            menu: null,
          },
          PAGE_WIKI_OKOLOTOK: {
            url: '/okolotok',
            title: 'Околотки',
            permission: PERMISSION_PRIVATE,
            exact: true,
            component: PageWikiOkolotok,
            icon: null,
            menu: null,
          },
          PAGE_WIKI_TP: {
            url: '/tp',
            title: 'ТП',
            permission: PERMISSION_PRIVATE,
            exact: true,
            component: PageWikiTP,
            icon: null,
            menu: null,
          },
          PAGE_WIKI_STATION: {
            url: '/station',
            title: 'Станции',
            permission: PERMISSION_PRIVATE,
            exact: true,
            component: PageWikiStation,
            icon: null,
            menu: null,
          },
        },
      },
    },
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

  // PAGE_PUBLIC: {
  //   url: '/public',
  //   title: 'Public',
  //   permission: PERMISSION_PUBLIC,
  //   exact: true,
  //   component: Pub,
  //   icon: null,
  //   menu: null,
  // },
  // PAGE_PRIVATE: {
  //   url: '/private',
  //   title: 'Private',
  //   permission: PERMISSION_PRIVATE,
  //   exact: true,
  //   component: Priv,
  //   icon: null,
  //   menu: null,
  // },
};


export default urlConst;