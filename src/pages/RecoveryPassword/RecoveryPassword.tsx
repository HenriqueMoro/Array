import React,{useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';



export default function RecoveryPassword(){
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const email = require('../../assets/email.png')

    function sendCode(){
        navigation.navigate('RecoveryPassword')
        setModalVisible(true)
    }

    
    return(
       <React.Fragment> 
        <Modal transparent={true} visible={modalVisible} >
                <View style={styles.centeredView}>
                <Image style={{width:80,height:75}} source={email} />
                    <Text>Cadastro realizado com sucesso!</Text>
                    <TouchableOpacity style={styles.button} onPress={()=>setModalVisible(!modalVisible)}><Text style={{color:'white'}}>Continuar</Text></TouchableOpacity>
                </View>
            </Modal>
        
        <View style={styles.container}>
            <Text style={{alignSelf:'flex-start',fontWeight:'bold', fontSize:25, color:'#5a5a7a'}}>Enviar código de recuperação</Text>
            <TextInput style={styles.form} placeholder="Email"></TextInput>
            <TouchableOpacity style={styles.button} onPress={sendCode}><Text style={{color:'white'}}>Enviar Código</Text></TouchableOpacity>
        </View>

        </React.Fragment>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-between',
        alignItems:'center',
        padding: 50,
        backgroundColor:'#fafafa',
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
    
    
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        
        
      },
    



})