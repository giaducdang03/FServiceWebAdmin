/* eslint-disable import/no-cycle */

import config from '../utils/cus-axios';

const refreshData = () => {
  const accesstoken = localStorage.getItem('accesstoken');
  let confi = {};
  if (accesstoken !== null)
    confi = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
  return confi;
};

const loginAPI = (data) => {
  const refreshedConfig = refreshData();
  return config.post('/api/authentication/SignIn', data, refreshedConfig);
};

// const Launch = () => {
//   const refreshedConfig = refreshData();
//   return config.get('/api/authentication/Launch', refreshedConfig);
// };

const fetchUser = (page) => {
  const refreshedConfig = refreshData();
  return config.get(`/api/accounts?PageNumber=${page}&PageSize=10`, refreshedConfig);
};

// const sendRefreshToken = (data) => {
//   const refreshedConfig = refreshData();
//   return config.post('/api/authentication/Refresh-token', data, refreshedConfig);
// };

// const signUp = (userData) => config.post('/api/authentication/SignUp', userData);

// const editUser = (id, data) => {
//   const refreshedConfig = refreshData();
//   return config.put(`/api/accounts/${id}`, data, refreshedConfig);
// };

// const deleteUser = (id) => config.delete(`/api/accounts/${id}`);

// const Order = (data) => {
//   const refreshedConfig = refreshData();
//   return config.post('/api/orders', data, refreshedConfig);
// };

export { loginAPI, fetchUser };
