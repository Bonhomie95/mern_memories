import * as api from '../api';
import { AUTH } from '../constants/actionTypes';
//Actions creators

export const signin = (formData, naviagte) => async (dispatch) => {
  try {
    // const { data } = await api.fetchPosts();
    // dispatch({ type: AUTH, payload: data });
    naviagte('/');
  } catch (error) {
    console.log(error);
  }
};
//Actions creators

export const signup = (formData, naviagte) => async (dispatch) => {
  try {
    // const { data } = await api.fetchPosts();
    // dispatch({ type: AUTH, payload: data });
    naviagte('/');
  } catch (error) {
    console.log(error);
  }
};
