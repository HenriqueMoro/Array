import React,{useState} from 'react'
import {View, Text, StyleSheet, TouchableOpacity,TextInput, ActivityIndicator,KeyboardAvoidingView,Platform,ScrollView} from 'react-native';
import TopBar from '../../components/TopBar';
import api from '../../service/api';
import AuthContext from '../../contexts/auth';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';


export default function Profile(){
    const [user,setUser] = useState('')
    const [email,setEmail] = useState('')
    const [currentPassword,setCurrentPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmNewPassword,setConfirmNewPassword] = useState('')

    const[loading,setLoading]=useState(false)
    const[loading2,setLoading2]=useState(false)

    const {token} = useContext(AuthContext)
    const AuthStr = 'Bearer '+ token

    const {t} = useTranslation('profile');
    
    
    async function handleUsers(){
            setLoading2(true)
            await api.put('/profile',{email:email,name:user},{headers:{Authorization:AuthStr}})
            setUser('')
            setEmail('')
            setLoading2(false)
            
        
        
            
        
    }

    async function handlePassword(){
        setLoading(true)
        await api.post('/reset-password',{current_password:currentPassword,new_password:newPassword,new_confirm_password:confirmNewPassword},{headers:{Authorization:AuthStr}})
        setCurrentPassword('')
        setConfirmNewPassword('')
        setNewPassword('')
        setLoading(false)
    }

    
    
    return(
        <View >
            <TopBar></TopBar>
            <View style={{justifyContent:'flex-end',alignItems:'center',alignSelf:'center',paddingTop:20}}>
                {loading2 ? <ActivityIndicator animating={loading2} size="large" color="#4169e1"/> : <React.Fragment>
                    <Text style={{alignSelf:'flex-start', color:'#5a5a7a',fontSize:16}}>{t('edit')}</Text>
                <TextInput style={styles.form} placeholder={t('username')} value={user} onChangeText={setUser}></TextInput>
                <TextInput style={styles.form} placeholder={'  Email'} value={email} onChangeText={setEmail}></TextInput>
                <TouchableOpacity onPress={handleUsers} style={styles.button}><Text style={{alignSelf:'center',color:'white',fontSize:16}}>{t('acess')}</Text></TouchableOpacity></React.Fragment>}
            </View>
            <View style={{justifyContent:'flex-end',alignItems:'center',alignSelf:'center'}}
            
            > 
                    {loading ? <ActivityIndicator animating={loading} size="large" color="#4169e1"/> : <React.Fragment>
                        
                        <Text style={{alignSelf:'flex-start', color:'#5a5a7a',fontSize:16}}>{t('change')}</Text>
                    <TextInput style={styles.form} placeholder={t('password')} value={currentPassword} onChangeText={setCurrentPassword}></TextInput>
                    <TextInput style={styles.form} placeholder={t('new')} value={newPassword} onChangeText={setNewPassword}></TextInput>
                    <TextInput style={styles.form} placeholder={t('confirm_password')} value={confirmNewPassword} onChangeText={setConfirmNewPassword}></TextInput>
                    <TouchableOpacity onPress={handlePassword} style={styles.button}><Text style={{alignSelf:'center',color:'white',fontSize:16}}>{t('save')}</Text></TouchableOpacity></React.Fragment>}
                </View>
        </View>
    )


}

const styles = StyleSheet.create({
    
    button:{
        height:60,
        width:150,
        margin:10,
        backgroundColor: '#4169E1',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'flex-end'
        
    },
    
    form:{
        height:50,
        width:250,
        margin:10,
        alignSelf:'center',
        borderColor:'#5a5a7a',
        borderWidth:2,
        borderRadius:10
        
    },
   
    })