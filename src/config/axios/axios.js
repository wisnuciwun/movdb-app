import axios from 'axios';

const defaultOptDev = {
  baseURL: process.env.REACT_APP_API_DATA,
  headers: {
    Host: 'www.omdbapi.com',
    Connection: 'keep-alive',
    Accept: 'text/plain, */*; q=0.01',
    Referer: 'http://www.omdbapi.com/',
      
  }
};

let Axios = axios.create(defaultOptDev);
 
export default Axios;