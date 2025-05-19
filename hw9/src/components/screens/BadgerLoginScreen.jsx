import { useContext, useState } from "react";
import { Alert, Button, StyleSheet, Text, View,TextInput } from "react-native";
import cur_user from "../../cur_user";
function BadgerLoginScreen(props) {
    const [account, set_acc] = useState('');
    const [pwd, set_pwd] = useState('');
    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <TextInput style={styles.input} placeholder="Your account here" value={account} onChangeText={(text) => set_acc(text)}></TextInput>
        <Text></Text>
        <TextInput style={styles.input} keyboardType='number-pad' secureTextEntry={true} placeholder="Your password here" value={pwd} onChangeText={(text) => set_pwd(text)}></TextInput>

        <Button color="crimson" title="Login" onPress={() => {
            // Alert.alert("Hmmm...", "I should check the user's credentials!");
            // Alert.alert(account, pwd);
            props.handleLogin(account, pwd);
        }} />
        <View style={styles.butt}>
        <Button color="grey" title="Signup"  onPress={() => props.setIsRegistering(true)} />
        <Text>    </Text>
        <Button color="grey" title="Continue as guest" onPress={() => {props.tmp_Login(true)
            const [cur_user, set_cur_user] = useContext(cur_user);
            set_cur_user('*tmp_user*');
        }} />
        </View>
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
    height: 35,
    width:240,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 4,
    },
    butt:{
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    }
});

export default BadgerLoginScreen;