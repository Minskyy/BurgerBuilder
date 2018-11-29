import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burgerbuilder-5da8a.firebaseio.com/'
});


export default instance;