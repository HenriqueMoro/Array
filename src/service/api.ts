import axios from 'axios';


const api = axios.create({
    baseURL:'http://api.viniciusviola.com/v1',
    
})

export default api