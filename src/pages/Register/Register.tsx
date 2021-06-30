import React,{useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, Image,KeyboardAvoidingView, Platform,ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import signUp from '../../service/register';
import TopBarAuth from '../../components/TopBarAuth';
import {useTranslation} from 'react-i18next';
import i18n from '../../locales';




export default function Register(){
    const navigation = useNavigation()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [statusEmail,setStatusEmail] = useState()
    const [statusPassword,setStatusPassword] = useState()
    const check = require('../../assets/check.png')
    const {t} = useTranslation('register');

    
    
    async function handleRegister(){
        const response = await signUp(name,email,password,passwordConfirmation)
        
        

        
        if (response.status !=201){
            const a = response.data.email
            const b = response.data.password
            
            setStatusEmail(a)
            setStatusPassword(b)
        }
        else{
            setModalVisible(true)
        }
    }   
    
    
   
    
    
    return(
        <KeyboardAvoidingView style={{flex:1,
            justifyContent: 'space-between',    
            
            backgroundColor:'#f2f2f2',
            opacity:modalVisible ? 0.5 :1}}
            behavior={Platform.OS == 'ios'?"padding":"height"}
            keyboardVerticalOffset={80}
            >
            <ScrollView style={{height:"100%"}}>
            
            <Modal transparent={true} visible={modalVisible} >
                <View style={styles.centeredView}>
                    <Image source={check} style={{width:150,height:120}} />
                    <Text>{t('modal')}</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Login')}}><Text style={{color:'white'}}>{t('continun')}</Text></TouchableOpacity>
                </View>
            </Modal>
            <TopBarAuth></TopBarAuth>
            
            <View style={{padding: 50,alignSelf:'center'}}>
            <Text style={{alignSelf:'flex-start',fontWeight:'bold', fontSize:25, color:'#5a5a7a',paddingBottom:15}}>{t('signUp')}</Text>
                <TextInput style={styles.form}placeholder={t('username')} onChangeText={setName} value={name}></TextInput>
                <TextInput style={styles.form1} placeholder="Email" onChangeText={setEmail}  value={email}></TextInput>
                <Text style={{color:'red', paddingHorizontal:5}}>{statusEmail}</Text>
                <TextInput style={styles.form2}placeholder={t('password')}secureTextEntry={true} onChangeText={setPassword} value={password} ></TextInput>
                <TextInput style={styles.form} placeholder={t('confirm_password')} secureTextEntry={true} onChangeText={setPasswordConfirmation} value={passwordConfirmation}></TextInput>
                <Text style={{color:'red', paddingHorizontal:5}}>{statusPassword}</Text>
            </View>

            <View style={{alignItems:'center'}}>
                <TouchableOpacity style={styles.button} onPress={handleRegister}><Text style={{color:'white'}}>{t('register')}</Text></TouchableOpacity>
                <TouchableOpacity style={{marginBottom:30}}><Text style={{color:'#4169e1'}} onPress={()=>{navigation.navigate('Login')}}>{t('login')}</Text></TouchableOpacity>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    
    button:{
        height:60,
        width:250,
        margin:10,
        backgroundColor: '#4169E1',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
        
    },
    Modalbutton:{
        height:60,
        width:250,
        margin:10,
        backgroundColor: '#25b660',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
        
    },
    
    form:{
        height:60,
        width:250,
        margin:10,
        alignSelf:'center',
        borderBottomColor:'#4169e1',
        borderBottomWidth:1.2,
        
    },
    form1:{
        height:60,
        width:250,
        marginTop:10,
        marginHorizontal:10,
        marginBottom:0,
        alignSelf:'center',
        borderBottomColor:'#4169e1',
        borderBottomWidth:1.2,
        
    },
    form2:{
        height:60,
        width:250,
        marginTop:0,
        marginHorizontal:10,
        marginBottom:10,
        alignSelf:'center',
        borderBottomColor:'#4169e1',
        borderBottomWidth:1.2,
        
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 'auto',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight:250,
        marginBottom:'auto',
        alignSelf:'center'
        
        
        
        
      },
    
    })