import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import cur_user from '../cur_user';

const ChatDrawer = createDrawerNavigator();

export default function App() {
  const [cur_name ,set_cur_name] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [tmp_login, set_tmp_login] = useState(false);
  useEffect(() => {
    // hmm... maybe I should load the chatroom names here
    fetch('https://cs571.org/rest/s25/hw9/chatrooms',{
      headers:{
        "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
      }
    })
    .then(res => res.json())
    .then(data => setChatrooms(data))
    // setChatrooms(["Hello", "World"]) // for example purposes only!
  }, []);

  function handleLogin(username, pin) {
    fetch('https://cs571.org/rest/s25/hw9/login',{
      method:'POST',
      headers:{
      "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
      'Content-Type':'application/json'
      },
      body:JSON.stringify({
        'username':username,
        'pin':pin
      })
    })
    .then(data => {
      if (data.status === 200){
        setIsLoggedIn(true);
      }
      return data.json()})
    .then(data => {
      alert(data.msg);
      set_cur_name(data.user.username)
      console.log(data.user.username)
      console.log(data);
      if (data.token){
        SecureStore.setItemAsync('cookie',data.token).then(console.log('token has been saved'))
      }
  });
    // setIsLoggedIn(true); // I should really do a fetch to login first!
  }

  function handleSignup(username, pin) {
      fetch('https://cs571.org/rest/s25/hw9/register',{
      method:'POST',
      headers:{
      "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
      'Content-Type':'application/json'
      },
      body:JSON.stringify({
        'username':username,
        'pin':pin
      })
    })
    .then(data => {
      if (data.status === 200){
        setIsLoggedIn(true);
      }
      return data.json()})
    .then(data => {
      alert(data.msg);
      console.log(data);
      if (data.token){
        SecureStore.setItemAsync('cookie',data.token).then(console.log('token has been saved'))
      }
  });
    // setIsLoggedIn(true); // I should really do a fetch to register first!
  }

  if (isLoggedIn || tmp_login) {
    return (
      <NavigationContainer>
        <cur_user.Provider value={[cur_name,set_cur_name]}>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} />}
              </ChatDrawer.Screen>
            })
          }
          {isLoggedIn ? <ChatDrawer.Screen name='Logout'>
            {() => <BadgerLogoutScreen logout={setIsLoggedIn}></BadgerLogoutScreen>}
          </ChatDrawer.Screen>:
            <ChatDrawer.Screen name='Sign in'>
              {() => <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} tmp_login={tmp_login}></BadgerLoginScreen>}
            </ChatDrawer.Screen>
          }
        {/* <ChatDrawer.Screen name='Logout' component={BadgerLogoutScreen} /> */}
        </ChatDrawer.Navigator>
        </cur_user.Provider>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} tmp_Login = {set_tmp_login}/>
  }
}