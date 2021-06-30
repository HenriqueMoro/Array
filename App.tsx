import Routes from './src/routes/index'
import React, { Fragment,Suspense } from 'react';
import './src/locales'
import {ActivityIndicator} from 'react-native'
import {AuthProvider} from './src/contexts/auth';
import {NavigationContainer} from '@react-navigation/native';





export default function App() {
  return (
    <NavigationContainer>
    <AuthProvider>
    
    <Suspense fallback={<ActivityIndicator></ActivityIndicator>}>
    <Routes></Routes>
    </Suspense>
    
    </AuthProvider>
    </NavigationContainer>
  );
}


