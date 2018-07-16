import { GETCOMMENTS, DELETECOMMENT } from '../Actions/commentActions.js';

export default (state = {}, action) => {
  switch(action.type) {
    case GETCOMMENTS:
      return action.payload.data;
    case DELETECOMMENT:
      return state;
    default:
      return state;
  }
}