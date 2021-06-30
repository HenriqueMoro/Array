import React,{useContext,useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput,Image,ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import AuthContext from '../../contexts/auth';
import TopBarAuth from '../../components/TopBarAuth';
import {useTranslation} from 'react-i18next';
import i18n from '../../locales';






export default function Login(){
    const navigation = useNavigation()
    
    const logo = require('../../assets/logo.png')
    const {t} = useTranslation('login');
    const {signed, Login,status} = useContext(AuthContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const[loading,isLoading] = useState(false)
    

    async function handleLogin (){
        isLoading(true)
        await Login(email,password);
        isLoading(false)
        
      
        
    }

    return(
        <View style={styles.container}> 
            
            <TopBarAuth></TopBarAuth>
            
                <View style={styles.iconsContainer}>
                <Text style={{color:'#5a5a7a', fontSize:15}}>{t('loginD')}</Text>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                

                    
                    
                    
                </View>
                
                
                <Image source={logo} style={{width:70,height:70}} />
            </View>
            
            <View style={styles.formContainer}>
                <View style={{alignSelf:'center'}}>
                    
                    <TextInput style={styles.form}placeholder="Email" onChangeText={setEmail} value={email} ></TextInput>
                    <TextInput style={styles.form} placeholder={t('password')} secureTextEntry={true} onChangeText={setPassword} value={password}></TextInput>
                    { status && (<Text style={{color:'red', paddingHorizontal:5}}>{t('erro')}</Text>)}
                </View>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={{color:'white'}}>{t('login')}</Text></TouchableOpacity>
                    
                    <TouchableOpacity style={{marginBottom:10}}><Text style={{color:'#4169e1'}} onPress={()=>{navigation.navigate('Register')}}>{t('signUp')}</Text></TouchableOpacity>
                </View>
                
                
                
                

            </View>


        </View>
    )
        
}

const styles = StyleSheet.create({
    formContainer:{
       flex:1,
        justifyContent:'space-between',
         
    },

    form:{
        height:60,
        width:250,
        margin:10,
        alignSelf:'center',
        borderBottomColor:'#4169e1',
        borderBottomWidth:1.2,
        
    },
    
    iconsContainer:{
        flex:1,
        justifyContent:'space-around',
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
    
    container:{
        flex:1,
        
        backgroundColor:'#f2f2f2',
        paddingBottom:25
        
    },
    
    


})