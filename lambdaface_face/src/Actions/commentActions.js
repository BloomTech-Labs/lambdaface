import axios from 'axios';

export const GETCOMMENTS = 'GETCOMMENTS';

const endpoint = process.env.REACT_APP_URL;

export const getComments = async (parentId, userId) => {
  const retValue = await axios.get(`${endpoint}api/comments/${parentId}/${userId}`)

  return {
    type: GETCOMMENTS,
    payload: retValue,
  };
};