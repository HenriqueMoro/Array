import React,{useState,useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput,Modal,FlatList, Dimensions, ActivityIndicator,Image} from 'react-native';
import api from '../../service/api';
import AuthContext from '../../contexts/auth';
import {useContext} from 'react';
import TopBar from '../../components/TopBar';
import {useTranslation} from 'react-i18next';




const WINDOW_HEIGHT = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const delete_img = require('../../assets/delete_image.png')
const edit = require('../../assets/edit.png')
const deleteIcon = require('../../assets/delete.png')


export default function Colections(){
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleTwo, setModalVisibleTwo] = useState(false);
    const [modalVisibleThree, setModalVisibleThree] = useState(false);
    const [books,setBooks] = useState< object | any>([])

    const [changeTitle,setChangeTitle] = useState('')
    const [changeAuthor,setChangeAuthor] = useState('')
    const [changeGenre,setChangeGenre] = useState('')
    const [changePages,setChangePages] = useState('')

    const[bookId,setBookId] = useState('')
    
    const[total,setTotal]=useState(0)
    const[page,setPage]=useState(1)
    const[loading,setLoading] = useState(false)
    

    const {token} = useContext(AuthContext)
    const AuthStr = 'Bearer '+token

    const {t} = useTranslation('colections');

    
    
    async function refresh(){
        
        setLoading(true)
        const response = await api.get('books',{headers:{Authorization:AuthStr }})
        setBooks(response.data.result.data)
        setLoading(false)
        
    }
        
    async function getBooks(){
        if (loading){
            return
        }
        if (total > 0 && books.length === total){
           return
        }
        
        setLoading(true)
        const response = await api.get('books?per_page=99999',{headers:{Authorization:AuthStr },params:{page}})//,params:{page}}
        setBooks([...books,...response.data.result.data])
        setTotal(response.data.result.total)

        setPage(page + 1)
        setLoading(false)
    }
    
    
    useEffect(()=>{
         
        getBooks()
         
    },[])

     async function editBook(){
        setLoading(true)
        if (changeTitle != ''){
            await api.put(`books/${bookId}`,{title:changeTitle},{headers:{Authorization:AuthStr}})
            setChangeTitle('')
        }
        if (changeAuthor != ''){
            await api.put(`books/${bookId}`,{author:changeAuthor},{headers:{Authorization:AuthStr}})
            setChangeAuthor('')
        }
        if (changeGenre != ''){
            await api.put(`books/${bookId}`,{genre:changeGenre},{headers:{Authorization:AuthStr}})
            setChangeGenre('')
        }
        if (changePages != ''){
            await api.put(`books/${bookId}`,{pages:changePages},{headers:{Authorization:AuthStr}})
            setChangePages('')
        }
        setLoading(false)
        setModalVisible(false)
        setBookId('')
        refresh()
    }

     async function createBook(){
        setLoading(true) 
        await api.post('books',{title:changeTitle,author:changeAuthor,genre:changeGenre,pages:changePages},{headers:{Authorization:AuthStr}})
        setChangeTitle('')
        setChangeAuthor('')
        setChangeGenre('')
        setChangePages('')
        setLoading(false)
        
        setModalVisibleTwo(false)
        refresh()
    }

    async function handleDelete(){
        setLoading(true)
        await api.delete(`books/${bookId}`,{headers:{Authorization:AuthStr}}).then((response)=>response).catch((response)=>response)
        setBookId('')
        setLoading(false)
        setModalVisibleThree(false)
        refresh()
    }
     

    return(
        <View style={{ height:WINDOW_HEIGHT}}>
            
            <Modal transparent={true} visible={modalVisible}>
                <View style={styles.centeredView}>
                   {loading ? <ActivityIndicator animating={loading} size="large" color="#4169e1"/>: <React.Fragment>
                   <Text style={{fontWeight:'bold',color:'#5a5a7a'}}>{t('edit')}</Text>
                    <TextInput style={styles.form}placeholder={t('title')} value={changeTitle} onChangeText={setChangeTitle}/>
                    <TextInput style={styles.form}placeholder={t('author')} value={changeAuthor} onChangeText={setChangeAuthor}/>
                    <TextInput style={styles.form}placeholder={t('genre')} value={changeGenre} onChangeText={setChangeGenre}/>
                    <TextInput style={styles.form}placeholder={t('pages')} value={changePages} onChangeText={setChangePages}/>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.button1} onPress={()=>setModalVisible(!modalVisible)} disabled={loading}><Text style={{color:'white'}}>{t('cancel')}</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={ editBook} disabled={loading}><Text style={{color:'white'}}>{t('confirm')}</Text></TouchableOpacity>
                    </View></React.Fragment>}
                   
                </View>
            </Modal>

            <Modal transparent={true} visible={modalVisibleTwo}>
                <View style={styles.centeredView}>
                   {loading ? <ActivityIndicator animating={loading} size="large" color="#4169e1"/> : <React.Fragment>
                    <Text style={{fontWeight:'bold',color:'#5a5a7a'}}>{t('add')}</Text>
                    <TextInput style={styles.form}placeholder={t('title')} value={changeTitle} onChangeText={setChangeTitle}/>
                    <TextInput style={styles.form}placeholder={t('author')} value={changeAuthor} onChangeText={setChangeAuthor}/>
                    <TextInput style={styles.form}placeholder={t('genre')} value={changeGenre} onChangeText={setChangeGenre}/>
                    <TextInput style={styles.form}placeholder={t('pages')} value={changePages} onChangeText={setChangePages}/>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.button1} onPress={()=>setModalVisibleTwo(!modalVisibleTwo)} ><Text style={{color:'white'}}>{t('cancel')}</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={createBook} disabled={loading}><Text style={{color:'white'}}>{t('confirm')}</Text></TouchableOpacity>
                    </View></React.Fragment>}
                    
                </View>
            </Modal>

            <Modal transparent={true} visible={modalVisibleThree}>
            <View style={styles.centeredView}>
                    {loading ? <ActivityIndicator animating={loading} size="large" color="#4169e1"/>:<React.Fragment><Image source={delete_img} style={{width:300}}></Image>
                    <Text style={{fontWeight:'bold',color:'#5a5a7a'}}>{t('delete')}</Text>
                    
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.button1} onPress={()=>setModalVisibleThree(!modalVisibleThree)} ><Text style={{color:'white'}}>{t('cancel')}</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={handleDelete} disabled={loading}><Text style={{color:'white'}}>{t('confirm')}</Text></TouchableOpacity>
                    </View></React.Fragment>}
                </View>
            </Modal>
            
            
            <TopBar></TopBar>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                

                <TouchableOpacity style={styles.Minibutton} onPress={()=>setModalVisibleTwo(true)}>
                    <Text style={{fontWeight:'bold',color:'#5a5a7a'}}>{t('create')}</Text>
                </TouchableOpacity>
            </View>
             <FlatList  data={books}
                        keyExtractor={(book:any) =>String(book.id)}
                        onRefresh={refresh}
                        refreshing={loading}
                        
                        onEndReached={getBooks}
                        onEndReachedThreshold={0.2}
                        
                        renderItem={({item:book})=>(
                            <View style={styles.card}>
                                <View style={styles.textBox}>
                                    <Text style={{fontWeight:'bold', fontSize:25, color:'#5a5a7a',paddingVertical:10}}>{book.title}</Text>
                                    <Text style={styles.textStyle}>{t('author')}: {book.author}</Text> 
                                    <Text style={styles.textStyle}>{t('genre')}: {book.genre}</Text>
                                    <Text style={styles.textStyle}>{t('pages')}: {book.pages}</Text>
                                </View>
                                
                                <View style={styles.buttonBox}>
                                    <TouchableOpacity onPress={()=>{setBookId(book.id); setModalVisible(true)}}><Image   source={edit} style={{paddingHorizontal:5,height:43,width:43,marginRight:10,marginTop:10}} /></TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{setBookId(book.id); setModalVisibleThree(true)}}><Image source={deleteIcon}  style={{paddingHorizontal:5,height:45,width:36,marginLeft:10,marginTop:10}}/></TouchableOpacity>
                                </View>
                                
                            </View>
            )}/>
            

            
        </View>
    )
}

const styles = StyleSheet.create({
    Minibutton:{
        
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width:150,
        maxWidth:200,
        maxHeight:40
    },



    card:{
        alignSelf:"center",
        margin: 10,
        backgroundColor: "white",
        borderRadius: 40,
        paddingHorizontal:35,
        paddingVertical:10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: windowWidth -30,
        height:300,
        
        maxHeight:300,
        
        
    },
    textBox:{
        flex:3
    },
    buttonBox:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    textStyle:{
        paddingVertical:5,
        fontSize:20
    },
    
    button:{
        height:55,
        width:130,
        backgroundColor: '#4169E1',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        
        
        
    },

   
    
    button1:{
        height:55,
        width:130,
        margin:10,
        backgroundColor: '#ff6348',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
        
    },
    button2:{
        height:55,
        width:130,
        margin:10,
        backgroundColor: '#25b660',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
        
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
        marginTop: 'auto',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxHeight:500,
        marginBottom:'auto'
        
        
        
        
      },

})