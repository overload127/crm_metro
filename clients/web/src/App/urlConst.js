import PageMain from '../pages/Main/Main';
import PageWiki from '../pages/Wiki/Wiki';
import PageWikiTP from '../pages/WikiTP/WikiTPContainer';

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
    menu: null,
  },
  PAGE_WIKI: {
    url: '/public',
    title: 'Public',
    permission: PERMISSION_PUBLIC,
    exact: true,
    component: Pub,
    menu: null,
  },
  PAGE_PUBLIC: {
    url: '/wiki',
    title: 'Wiki',
    permission: PERMISSION_PUBLIC,
    exact: true,
    component: PageWiki,
    menu: {
      PAGE_WIKI_TP: {
        url: '/tp',
        title: 'ТП',
        permission: PERMISSION_PUBLIC,
        exact: true,
        component: PageWikiTP,
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
    menu: null,
  },
  PAGE_LOGIN: {
    url: '/login',
    title: 'Вход',
    permission: PERMISSION_GUEST,
    exact: true,
    component: PageLogin,
    menu: null,
  },
  PAGE_LOGOUT: {
    url: '/logout',
    title: 'Выход',
    permission: PERMISSION_PRIVATE,
    exact: true,
    component: PageLogout,
    menu: null,
  },
};


export default urlConst;