import { useEffect, useState } from "react";
import { Alert, Button, Image, Pressable, Text, View } from "react-native";

import CS571 from "@cs571/mobile-client"

// TODO: Display the bio data from https://cs571api.cs.wisc.edu/rest/s25/ice/mascot
// TODO: Whenever a button is clicked, display the message from https://cs571api.cs.wisc.edu/rest/s25/ice/mascot-messages
export default function Mascot(props) {
    const [names, setname] = useState('undfine');
    const [quote,set_q] = useState('');
    const [img,setimg] = useState('');
    const [message,setmsg]  = useState('');
    useEffect(() =>{
        fetch('https://cs571.org/rest/s25/ice/mascot', {
            headers:{
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
            }
        })
        .then(res => res.json())
        .then(res => {
            set_q(res.quote);
            setname(res.name);
            setimg(res.imgSrc);
        })
    }, [])
    function on_click(){
        fetch('https://cs571.org/rest/s25/ice/mascot-messages', {
            headers:{
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
            }
        })
        .then(res => res.json())
        .then(res => {
            Alert.alert('Funny?',res.msg);
            setmsg(res.msg);
            })
    }
    return <View>
        <Text style={{fontSize:34, color:'grey'}}>{names}</Text>
        <Text></Text>
        <Text>{quote}</Text>
        <Button title="Daily joke" onPress={on_click}></Button>
        <Pressable onPress={on_click}>
        <Image style={{width:245,height:245}} source={{uri:img}}/>
        </Pressable>
        </View>
}