import axios from 'axios';

// eslint-disable-next-line import/no-cycle
// import UseRefreshToken from '../services/UserService';

const config = axios.create({
  baseURL: 'https://fservices.azurewebsites.net',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
  },
});
// const refresh = UseRefreshToken();
config.interceptors.response.use(
  (response) => response || { status: response.status },
  async (error) => {
    const res = {};
    const eRes = error.response;

    // const prevRequest = error.config;
    // if (eRes?.status === 401 && !prevRequest.sent) {
    //   prevRequest.sent = true;
    //   const newAccessToken = await refresh();
    //   if (newAccessToken) {
    //     console.log('check new token', newAccessToken);
    //     prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //     return config(prevRequest);
    //   }
    // }

    if (eRes) {
      res.data = eRes.data;
      res.status = eRes.status;
      res.message = eRes.data.message;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    return res;
  }
);

export default config;
