import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View,TextInput } from "react-native";

function BadgerRegisterScreen(props) {
    const [name,set_name] = useState('');
    const [pin,set_pin] = useState('');
    const [pin_d, set_pin_d] = useState(''); 
    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <TextInput style={styles.input} value={name} onChangeText={(t) => set_name(t)} placeholder="Put your username here!"></TextInput>
        <TextInput secureTextEntry={true}  keyboardType='number-pad' style={styles.input} value={pin} onChangeText={(t) => set_pin(t)} placeholder="Put your PIN here!"></TextInput>
        <TextInput secureTextEntry={true} keyboardType='number-pad' style={styles.input} value={pin_d} onChangeText={(t) => set_pin_d(t)} placeholder="Confirm PIN"></TextInput>
        {pin.length? <Text></Text>:<Text style={{color:'red'}}>Pleace Enter a pin</Text>}
        <Text>
        <Button color="crimson" title="Signup" onPress={() => {
            if (pin != pin_d){
                Alert.alert('Error', 'Two pin not same!');
                return
            }
            props.handleSignup(name,pin)}} />
        <Text>    </Text>
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
        </Text>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input:{
        width:240,
        borderColor:'grey',
        borderWidth:0.4
    }
});

export default BadgerRegisterScreen;