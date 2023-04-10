import axios from 'axios';

const token = localStorage.getItem('token');

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + token,
    },
    timeout: 3000
});


export default instance;