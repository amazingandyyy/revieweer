import axios from 'axios';

let request = axios.create({
  baseURL: 'http://localhost:8000',
  "Access-Control-Allow-Origin": "*"
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');

export default request;