import axios from 'axios';

let axiosService = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
export default axiosService;