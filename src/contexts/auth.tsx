import React,{createContext,useState, useEffect,useContext} from 'react'
import signIn from '../service/auth'
import {AsyncStorage} from 'react-native'

interface AuthContextData {
    signed:boolean;
    token: string | null;
    status: boolean;
    Login(email:string,password:string): Promise<void>;
    Logout():void ;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) =>{
    const [token, setToken] = useState<string | null>(null)
    const [status,setStatus] = useState(false)
    const {signed} = useContext(AuthContext)
    const[sign,setSign] = useState(false)
    
    useEffect(()=>{
        async function loadStorageData(){
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token')
            if(storagedToken){
            setToken(storagedToken)
            }
        }

        loadStorageData()
    },[])
    
    async function Login(email:string,password:string): Promise<void>{
       const response = await signIn(email,password)
       if (response.status ===200){
        setToken(response.data.token)
       }
       else{
           setStatus(true)
       }
       
     
    
       
       
       
       
       await AsyncStorage.setItem('@RNAuth:token',response.data.token)
    
    }
    async function Logout(){
        setToken(null)
        await AsyncStorage.setItem('@RNAuth:token','')
        console.log(signed)
       console.log(token)
   }  
    
    return(
    <AuthContext.Provider value={{signed:!!token,token:token,Login,status:status,Logout}}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthContext;