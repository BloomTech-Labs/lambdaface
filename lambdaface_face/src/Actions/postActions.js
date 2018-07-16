import axios from 'axios';

export const GETPOST = 'GETPOST';
export const ADDPOST = 'ADDPOST';
export const EDITPOST = 'EDITPOST';
export const DELETEPOST = 'DELETEPOST';

const endpoint = process.env.REACT_APP_URL;

export const getPost = async (postId, userId) => {
  const retValue = await axios.get(`${endpoint}api/post/${postId}/${userId}`)

  return {
    type: GETPOST,
    payload: retValue,
  }
};

export const addPost = newPost => {
  const retValue = axios.post(`${endpoint}api/posts`, newPost);

  return {
    type: ADDPOST,
    payload: retValue,
  };
};

export const editPost = (postId, userId, content) => {
  const retValue = axios.put(`${endpoint}api/post/${postId}/${userId}`, { content });

  return {
    type: EDITPOST,
    payload: retValue,
  }
}

export const deletePost = (postId, userId) => {
  const retValue = axios.delete(`${process.env.REACT_APP_URL}api/post/${postId}/${userId}`);
  return {
    type: DELETEPOST,
    payload: retValue,
  }
};