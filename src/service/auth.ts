import api from './api'




export default function signIn(email:string,password:string){
    return  api.post('/login',{email:email,password:password}).then(function(response){return response}).catch(function(error){return error.response.status})
}