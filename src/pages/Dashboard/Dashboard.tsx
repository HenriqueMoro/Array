import React,{useEffect,useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput,Image} from 'react-native';
import {useNavigation} from '@react-navigation/native'

import api from '../../service/api';
import AuthContext from '../../contexts/auth';
import {useContext} from 'react';
import TopBar from '../../components/TopBar';
import {useTranslation} from 'react-i18next';

export default function Dashboard(){

    const {token} = useContext(AuthContext)
    const AuthStr = 'Bearer '+ token
    const [user,setUser] = useState('')
    const [book,setBook] = useState('')
    const [lastEdit,setLastEdit] = useState('')
    const [userNumber,setUsersNumber]=useState('')
    const navigation = useNavigation()

    const {t} = useTranslation('dashboard');

    async function getUser(){
        const response = await api.get('/profile',{headers:{Authorization:AuthStr}})
        const responseTwo = await api.get('/books',{headers:{Authorization:AuthStr}})
        const responseThree = await api.get('/users',{headers:{Authorization:AuthStr}})
        const responseFour = await api.get('/profile',{headers:{Authorization:AuthStr}})
        setBook(responseTwo.data.result.total)
        setUser(response.data.user.name)
        setUsersNumber(responseThree.data.total)
        setLastEdit(responseFour.data.edited_at)
        

    }

    
    
    
         
        getUser()
        
         
    
        
    

    return(
        <View style={styles.container}>
            <TopBar></TopBar>
            <Text style={{alignSelf:'flex-start',paddingLeft:'18%',justifyContent:'center',paddingTop:20,fontWeight:'bold', fontSize:30, color:'#5a5a7a'}}>{t('welcome')}{user}</Text>
            <View style={{paddingBottom:20,flex:1,alignSelf:'center',marginTop:30}}>
                <TouchableOpacity onPress={()=> navigation.navigate('Colections')} style={styles.Minibutton2}>
                    
                    <Text style={{color:'#5a5a7a', fontSize:25}}>{t('library')}</Text>
                </TouchableOpacity>
               
                <View style={styles.card2}>
                    <Text style={{color:'#5a5a7a', fontSize:15}}>{t('item')}{book}</Text>
                </View>
                <View style={styles.card2}>
                    <Text style={{color:'#5a5a7a', fontSize:15}}>{t('time')}{userNumber}</Text>
                </View>
                <View style={styles.card2}>
                    <Text style={{color:'#5a5a7a', fontSize:15}}>{t('edit')}{lastEdit}</Text>
                </View>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    card1:{
        flex:1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
       
        margin: 20,
        backgroundColor: "#4169e1",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 250
        
    },
    card2:{
        flex:1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        maxHeight:200,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 25,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 250
        
    },
    Minibutton2:{
        flexDirection:'row',
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 22,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 25,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:250,
        //maxWidth:100,
        //maxHeight:25
    },

})