import {
  applyMiddleware,
  createStore,
  combineReducers
} from 'redux';
import thunkMiddkeware from 'redux-thunk';
import authReduser from './auth/redusers';


const rootRedusers = combineReducers({
  auth: authReduser,
});

const store = createStore(rootRedusers, applyMiddleware(thunkMiddkeware));

// TODO: Удалить
window.store = store;

export default store;