import {
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux';
import thunkMiddkeware from 'redux-thunk';
import authReduser from './auth/redusers';
import userReduser from './user/redusers';
import wikiReduser from './wiki/redusers';
import TPWorkReduser from './tpwork/redusers';
import progressBarReduser from './progressBar/redusers';


const rootRedusers = combineReducers({
  auth: authReduser,
  user: userReduser,
  wiki: wikiReduser,
  tpwork: TPWorkReduser,
  progressBar: progressBarReduser,
});

const store = createStore(rootRedusers, applyMiddleware(thunkMiddkeware));

// TODO: Удалить
window.store = store;

export default store;