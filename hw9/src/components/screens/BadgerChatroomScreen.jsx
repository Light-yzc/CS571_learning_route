import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View ,Button,Modal, Alert} from "react-native";
import BadgerChatMessage from "../helper/BadgerChatMessage";
import { FlatList, TextInput } from "react-native-gesture-handler";
import BadgerCard from "../helper/BadgerCard";
import * as SecureStore from 'expo-secure-store';
import cur_user from "../../cur_user";
function BadgerChatroomScreen(props) {

    const [modal_visible, set_modal] = useState(false);
    const [msgs, set_msgs] = useState([]);
    const [cur_refre, set_refreshing] = useState(true);
    const [is_refresh, set_refresh] = useState(false);
    const [title, set_title] = useState('');
    const [body, set_body] = useState('');
    useEffect(() =>{
        fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${props.name}`,{
            headers:{
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
            }
        })
        .then(res => res.json())
        .then(data => {
            set_msgs(data.messages);
            // console.log(msgs);
            set_refreshing(false)

        })
    },[is_refresh])
    function refresh(){
        set_refreshing(true);
        set_refresh(!is_refresh);
        console.log('refreshing!')

    }
    function del_Post(id){
        console.log(id);
        SecureStore.getItemAsync('cookie').then(result =>{
        console.log('cookie ' + result)
        if (result){
        fetch(`https://cs571.org/rest/s25/hw9/messages?id=${id}`,{
            method:'DELETE',
            headers:{
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
                'Authorization': 'Bearer ' + result
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            Alert.alert('Msg', data.msg);
            set_refresh(!is_refresh);
        })
        }
       else{
        Alert.alert('ERROR!','JWT GOES WRONG')
    }
    }

        )}
    function post_posts(title,body){
        SecureStore.getItemAsync('cookie').then(result => {
            if(result){
            fetch(`https://cs571.org/rest/s25/hw9/messages?chatroom=${props.name}`,{
            method:'POST',
            headers:{
            "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
            "Authorization": 'Bearer ' + result,
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'title':title,
                'content':body

            })
        })
        .then(res => {
            if (res.status === 200){
                set_modal(false);
                set_refresh(!is_refresh);
            }
            return res.json();
        })
        .then(data =>{
            Alert.alert('MSG!',data.msg);
        })
            }
        else{
            alert('Wrong JWT!')
        }
        })

    }
    const [cur_users, set_cur_user] = useContext(cur_user);
    return <View>
        <FlatList data={msgs} keyExtractor={(msg)=>msg.id} refreshing={cur_refre} onRefresh={()=>refresh()} renderItem={(msg) => {
        return <BadgerChatMessage {...msg.item} del_post = {del_Post}></BadgerChatMessage>
    }} ListFooterComponent={
        <View>
            <Modal 
            animationType="fade"
            transparent={true}
            visible={modal_visible}
            >
                <View style={styles.mobal}>
                    <BadgerCard>
                        <Text style={{fontSize:24}}>Create A Post{'\n'}</Text>
                        <Text style={{fontSize:17}}>Title</Text>
                        <TextInput style={styles.input} value={title} onChangeText={(t) => set_title(t)}></TextInput>
                        <Text style={{fontSize:17}}>{'\n'}Body</Text>
                        <TextInput style={styles.input} value={body} onChangeText={(t) => set_body(t)}></TextInput>
                        <Text>{'\n'}</Text>

                        <View style={styles.btn_row}>
                        
                        <Button title="POST" color={'crimson'} style={styles.btn} onPress={()=> post_posts(title, body)}></Button>
                        <Text>    </Text>
                        <Button title="CANCEL" style={styles.btn} onPress={() => set_modal(false)}></Button>
                        </View>
                        </BadgerCard>
                </View>
            </Modal>
            <Text></Text>
         {cur_users ==='r'? <Text></Text>:<Button title="add post" color={'crimson'} onPress={() =>set_modal(true)}></Button>}   
       
        </View>
    }>
        
    </FlatList>
    </View>

    // return <View style={{ flex: 1 }}>
    //     {msgs.map((msg) => {
    //         return <BadgerChatMessage {...msg}></BadgerChatMessage>
    //     })}
    //     <Text style={{margin: 100}}>This is a chatroom screen!</Text>
    // </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobal:{
        margin: 120,
    // backgroundColor: 'white',
    // borderRadius: 20,
    // padding: 35,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
    },
    btn_row:{
        flexDirection:'row'
    },
    btn:{
        borderRadius:30
    },
    input:{
        width:245,
        borderColor:'grey',
        borderWidth:0.4,
        padding:10
    }
});

export default BadgerChatroomScreen;