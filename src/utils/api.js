import axios from 'axios';

export default
axios.create({
  baseURL: 'http://ec2-100-26-220-141.compute-1.amazonaws.com/api',
  timeout: 7000,
});
