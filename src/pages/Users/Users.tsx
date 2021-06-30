import React,{useState,useEffect,useContext} from 'react';
import {View, Text, StyleSheet,FlatList,Dimensions} from 'react-native';
import TopBar from '../../components/TopBar';
import api from '../../service/api';
import AuthContext from '../../contexts/auth';

const WINDOW_HEIGHT = Dimensions.get('window').height;

export default function Users(){
    
    const {token} = useContext(AuthContext)
    const AuthStr = 'Bearer '+token
    const[users,setUsers] = useState< object | any>([])

   async function getUsers(){
        const response = await api.get('users',{headers:{Authorization:AuthStr }})
        setUsers(response.data.users)
    }
    useEffect(()=>{
        getUsers()
    },[])

    return(
        <View style={{height:WINDOW_HEIGHT}}>
            <TopBar></TopBar>
            <FlatList 
            data={users}
            keyExtractor={(users:any)=>String(users.id)}
            onEndReached={getUsers}
            onEndReachedThreshold={0.2}
            renderItem={({item:users})=>(
                <View style={styles.container}>
                    <Text style={styles.text}>{users.name}</Text>
                </View>
            )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'space-between',
        
    },

    text:{
        color:"#5a5a7a",
        fontSize:20,
        margin:15
    }
})