import {
  loginFailure,
  loginSuccess,
  loginStart,
  signUpFailure,
  signUpSuccess,
  signUpStart,
} from './userRedux';
import { publicRequest } from '../requestMethods';
import axios from 'axios';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/users/login', user);
    dispatch(loginSuccess(res.data));
  } catch (e) {
    dispatch(loginFailure());
  }
};

export const signUp = async (user, dispatch) => {
  signUpStart();
  try {
    const res = await publicRequest.post('/users/signup', user);
    dispatch(signUpSuccess(res.data));
  } catch (e) {
    signUpFailure();
  }
};
