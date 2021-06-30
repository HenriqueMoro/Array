import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Dashboard from '../pages/Dashboard/Dashboard';
import Colections from '../pages/Colections/Colections'
import Profile from '../pages/Profile/Profile'
import TopBar from '../components/TopBar';
import Users from '../pages/Users/Users';


const AppStack = createStackNavigator();

export default function AppRoutes(){
    return(
        

        <AppStack.Navigator screenOptions={{headerShown: false}}>
            
            <AppStack.Screen name='Dashboard'component={Dashboard}/>
            <AppStack.Screen name='Users'component={Users}/>
            <AppStack.Screen name='Colections'component={Colections}/>
            <AppStack.Screen name='Profile' component={Profile}/>
        
        </AppStack.Navigator>

    
    );}