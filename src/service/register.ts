import api from './api'

export default function signUp(name:string,email:string,password:string,password_confirmation:string){
    return api.post('/register',{name:name,email:email,password:password,password_confirmation:password_confirmation}).then(
        function(response){
            return response
        }
    ).catch(
       function(error){
           return error.response
       } 
    )
}