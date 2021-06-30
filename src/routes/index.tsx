import React,{useContext} from 'react'
import {View,Text} from 'react-native'
import AuthContext from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';


export default function Routes(){
    const {signed} = useContext(AuthContext)
    return signed ? <AppRoutes/> : <AuthRoutes/>
}

