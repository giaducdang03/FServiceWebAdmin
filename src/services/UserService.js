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

const getService = () => {
  const refreshedConfig = refreshData();
  return config.get('/api/services', refreshedConfig);
};

// const Launch = () => {
//   const refreshedConfig = refreshData();
//   return config.get('/api/authentication/Launch', refreshedConfig);
// };

const fetchUser = (page) => {
  const refreshedConfig = refreshData();
  return config.get(`/api/accounts?PageNumber=${page}&PageSize=50`, refreshedConfig);
};

const fetchOrder = () => {
  const refreshedConfig = refreshData();
  return config.get(`/api/orders?PageSize=50`, refreshedConfig);
};

const fetchPackage = () => {
  const refreshedConfig = refreshData();
  return config.get(`/api/packages`, refreshedConfig);
};

export { loginAPI, fetchUser, getService, fetchOrder, fetchPackage };
