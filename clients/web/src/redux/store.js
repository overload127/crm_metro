import {
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux';
import thunkMiddkeware from 'redux-thunk';
import authReduser from './auth/redusers';
import wikiReduser from './wiki/redusers';


const rootRedusers = combineReducers({
  auth: authReduser,
  wiki: wikiReduser,
});

const store = createStore(rootRedusers, applyMiddleware(thunkMiddkeware));

// TODO: Удалить
window.store = store;

export default store;