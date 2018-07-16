import { GETPOST, ADDPOST, DELETEPOST } from '../Actions/postActions.js';

export default (state = {}, action) => {
  switch(action.type) {
    case GETPOST:
      return action.payload.data;
    case ADDPOST:
      return state;
    case DELETEPOST:
      return state;
    default:
      return state;
  }
}