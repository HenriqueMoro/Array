import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import Constants from 'expo-constants'
import TopBarAuth from '../../components/TopBarAuth';
import {useTranslation} from 'react-i18next';
import i18n from '../../locales';



export default function Starting(){
    const navigation = useNavigation()
    const settings = require('../../assets/settings.png')
    const logo = require('../../assets/logo.png')

    const {t} = useTranslation('starting');


    
    return(
        <View style={styles.container}>
           
           <TopBarAuth></TopBarAuth> 
            <Text style={styles.text}>{t('welcome')}</Text>
            <View style={{alignSelf:'center'}}>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Register')}}>
                    <Text style={styles.textButton}>{ t('signUp')}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Login')}}>
                    <Text style={styles.textButton}>{t('login')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#f2f2f2',
        flex:1,
        justifyContent: 'space-between',
        
    },

    header:{
        width:'100%',
        paddingTop: Constants.statusBarHeight + 20,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    button:{
        height:60,
        width:250,
        margin:10,
        backgroundColor: '#4169E1',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
        
    },
    textButton:{
        color:'white'
    },

    text:{
        width:250,
        fontWeight:'bold',
        fontSize:35,
        color:'#5a5a7a',
        alignSelf:'center'
    }



})