import { Text , Button, Alert} from "react-native";
import BadgerCard from "./BadgerCard"
import cur_user from "../../cur_user";
import { useContext, useEffect } from "react";
import * as SecureStore from 'expo-secure-store' 
function BadgerChatMessage(props) {
    const [now_user,change_user] = useContext(cur_user);
    const dt = new Date(props.created);
    

    return <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
        <Text style={{fontSize: 28, fontWeight: 600}}>{props.title}</Text>
        <Text style={{fontSize: 12}}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
        <Text></Text>
        <Text>{props.content}</Text>
        {props.poster === now_user? <Button title="Del POST" color='red' onPress={()=> props.del_post(props.id)}></Button>:<Text></Text>}
    </BadgerCard>
}

export default BadgerChatMessage;