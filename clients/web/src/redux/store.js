import {
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux';
import thunkMiddkeware from 'redux-thunk';
import authReduser from './auth/redusers';
import wikiReduser from './wiki/redusers';
import TPWorkReduser from './tpwork/redusers';


const rootRedusers = combineReducers({
  auth: authReduser,
  wiki: wikiReduser,
  tpwork: TPWorkReduser,
});

const store = createStore(rootRedusers, applyMiddleware(thunkMiddkeware));

// TODO: Удалить
window.store = store;

export default store;