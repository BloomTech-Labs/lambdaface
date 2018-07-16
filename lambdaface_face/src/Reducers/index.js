import { combineReducers } from 'redux';

import post from './postReducer.js';
import comments from './commentReducer.js';

export default combineReducers({
  post,
  comments,
})