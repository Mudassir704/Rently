import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService'


axios.interceptors.response.use(null, error => {
    const expectedError = 
        error.response && 
        error.response.status >= 400 &&
        error.response.status < 500;
    
        if(!expectedError){
            logger.log("Logging the error", error);
            toast.error("An Unexpected error occurred.");
        }
        
        return Promise.reject(error);
    });
    
function setJwt(jwt){
    axios.defaults.headers.common['x-auth-token'] = jwt;
}

//eslint-disable-next-line
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}