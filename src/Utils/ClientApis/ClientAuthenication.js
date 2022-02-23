import store from '../../Slices/store';

const getAuthenication = () => {
  let accessToken = store.getState().auth.accessToken;

  //Need to implement a refresh token to refresh the access token

  let auth = {
    type: 'bearer',
    accessToken: accessToken,
  };

  return auth;
};

const refreshToken = () => {};

export {getAuthenication};
