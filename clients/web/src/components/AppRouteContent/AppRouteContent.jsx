import React from 'react';
import { Route, Switch } from 'react-router-dom';

import urlConst, { PERMISSION_PUBLIC, PERMISSION_GUEST, PERMISSION_PRIVATE } from '../../App/urlConst';


import AuthRoute from '../Routs/AuthRoute';
import GuestRoute from '../Routs/GuestRoute';



function createRouteSwitch(urlTree, urlPrefix='') {
  let routeSwitch = [];

  Object.keys(urlTree).forEach(key => {
    switch(urlTree[key].permission) {
      case PERMISSION_PUBLIC: {
        if(urlTree[key].exact){
          routeSwitch.push(<Route key={urlPrefix+urlTree[key].url} exact path={urlPrefix+urlTree[key].url} component={urlTree[key].component} />);
        } else {
          routeSwitch.push(<Route key={urlPrefix+urlTree[key].url} path={urlPrefix+urlTree[key].url} component={urlTree[key].component} />);
        }
        break;
      }
      case PERMISSION_GUEST: {
        if(urlTree[key].exact){
          routeSwitch.push(<GuestRoute key={urlPrefix+urlTree[key].url} exact path={urlPrefix+urlTree[key].url}  component={urlTree[key].component} />);
        } else {
          routeSwitch.push(<GuestRoute key={urlPrefix+urlTree[key].url} path={urlPrefix+urlTree[key].url}  component={urlTree[key].component} />);
        }
        break;
      }
      case PERMISSION_PRIVATE: {
        if(urlTree[key].exact){
          routeSwitch.push(<AuthRoute key={urlPrefix+urlTree[key].url} exact path={urlPrefix+urlTree[key].url}  component={urlTree[key].component} />);
        } else {
          routeSwitch.push(<AuthRoute key={urlPrefix+urlTree[key].url} path={urlPrefix+urlTree[key].url}  component={urlTree[key].component} />);
        }
        break;
      }
      default: {
        break;
      }
    }

    if(urlTree[key].menu) {
      const localRouteSwitch = createRouteSwitch(urlTree[key].menu, urlPrefix+urlTree[key].url);

      routeSwitch = [...routeSwitch, ...localRouteSwitch];
    }
  });

  return routeSwitch;
}


const routeSwitch = createRouteSwitch(urlConst);


function AppRouteContent() {
  return (
    <Switch>
      {routeSwitch}
    </Switch>
  );
};

export default AppRouteContent;