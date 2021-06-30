import React,{useState,useContext,useMemo,useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image,Modal} from 'react-native';
import Constants from 'expo-constants';
import {useNavigation} from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import AuthContext from '../contexts/auth';
import {useTranslation} from 'react-i18next';




const config = require('../assets/settings.png')
const logo = require('../assets/logo.png')


export default function TopBar(){
    const [modal,setModal] = useState(false)
    const navigation = useNavigation()
    const {Logout} = useContext(AuthContext)

    const[able,isAble] = useState(true)
    console.log(modal)
    const {t, i18n} = useTranslation('topbar');
    

    const languages = useMemo(() => {
        return [
        {name: t('portuguese'), id: 'pt-BR'},
        {name: t('english'), id: 'en-US'},
        ];
    }, [i18n.language]);

    const onPressLanguage = useCallback(language => {
        i18n.changeLanguage(language);
      }, []);
    
    return(
        <View> 
            <Modal transparent={true} visible={modal}>
                <View style={{flexDirection:'row',flex:1}}>
                    <View style={styles.modal}>

                        <TouchableOpacity style={styles.Minibutton} onPress={()=>{setModal(false);navigation.navigate('Profile')}}>
                            <Text style={{fontWeight:'bold',color:'#5a5a7a',fontSize:17}}>{t('profile')}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={[styles.languageOne,{opacity:able?0.5:1}]} disabled={able} onPress={()=> {onPressLanguage('pt-BR');isAble(true)}}>
                            <Text style={{fontWeight:'bold',color:'#5a5a7a',fontSize:15}}>{t('portuguese')}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={[styles.languageTwo,{opacity:able?1:0.5}]} disabled={!able} onPress={()=> {onPressLanguage('en-US');isAble(false)}}>
                            <Text style={{fontWeight:'bold',color:'#5a5a7a',fontSize:15}}>{t('english')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.Minibutton2} onPress={()=>navigation.navigate('Users')}>
                            <Text style={{fontWeight:'bold',color:'#5a5a7a',fontSize:17}}>{t('users')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={Logout} style={styles.Minibutton2}>
                            <MaterialIcons name="logout" size={40} color="#5a5a7a" />
                        </TouchableOpacity>


                    </View>
                    <TouchableOpacity onPress={()=>setModal(false)}style={{alignSelf:'flex-end',height:"100%",flex:6}}>

                    </TouchableOpacity>
                
                </View>
        </Modal>
            
            
            
            <View style={styles.header}>
              <TouchableOpacity onPress={()=> setModal(true)}>
                  <Image source={config} style={{height:37, width:37, marginHorizontal:15}}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}>
                <Image source={logo} style={{height:60, width:60, marginHorizontal:15}}/>
              </TouchableOpacity>
                

            
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
  
    
    header:{
      width:'100%',
      paddingTop: Constants.statusBarHeight + 10,
      flexDirection: 'row',
      justifyContent:'space-between',
      alignItems:'center',
      
      backgroundColor: '#f2f2f2',
  },

  modal:{
    flex:4,  
    alignSelf:'flex-start',
      height:"100%",
      
      backgroundColor:'#ffffff',
      shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  Minibutton:{
    alignSelf:'center',   
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 7,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:100,
    maxWidth:100,
    maxHeight:25
},
languageOne:{
        
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    //marginTop: 22,
    //margin: 20,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:100,
    maxWidth:100,
    maxHeight:35,
    color:"#5a5a7a"
},
languageTwo:{
        
    justifyContent: "center",
    alignItems: "center",
    alignSelf:'center',
    //marginTop: 22,
    //margin: 20,
    backgroundColor: "white",
    borderTopWidth: 0.5,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:100,
    maxWidth:100,
    maxHeight:35,
    color:"#5a5a7a"
},
Minibutton2:{
    alignSelf:'center',   
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 7,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:100,
    //maxWidth:100,
    //maxHeight:25
},
  });       