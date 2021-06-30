import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../pages/Login/Login'
import Starting from '../pages/Starting/Starting';
import Register from '../pages/Register/Register';
import RecoveryPassword from '../pages/RecoveryPassword/RecoveryPassword';




const AuthStack = createStackNavigator();

export default function AuthRoutes(){
    return(
        
        
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
           <AuthStack.Screen name="Starting" component={Starting}/>
            <AuthStack.Screen name="Register" component={Register}/>
            
            <AuthStack.Screen name="Login" component={Login}/>
            
            
            <AuthStack.Screen name="RecoveryPassword" component={RecoveryPassword}/>
            
        </AuthStack.Navigator>

    
    );}

     