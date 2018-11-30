import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:3001'
})

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if(error.response && error.response.status === 400){
        return Promise.reject({
            message: error.response.data.error
        })
    }
    return Promise.reject({
        message: "Something went wrong"
    });
});
export default axios;
