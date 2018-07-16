import { GETCOMMENTS } from '../Actions/commentActions.js';

export default (state = {}, action) => {
  switch(action.type) {
    case GETCOMMENTS:
      return action.payload.data;

    default:
      return state;
  }
}