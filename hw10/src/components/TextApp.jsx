import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import get_api from './get_api';
import TextAppMessageList from './TextAppMessageList';
import Constants from '../constants/Constants';

const CS571_WITAI_ACCESS_TOKEN = ""; // Put your CLIENT access token here.

function TextApp() {

    // Set to true to block the user from sending another message
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState([]);
    const inputRef = useRef();

    /**
     * Called when the TextApp initially mounts.
     */
    async function handleWelcome() {
        addMessage(Constants.Roles.Assistant, "Welcome to BadgerChat! How can I help you?");
    }

    /**
     * Called whenever the "Send" button is pressed.
     * @param {Event} e default form event; used to prevent from reloading the page.
     */
    async function handleSend(e) {
        e?.preventDefault();
        const input = inputRef.current.value?.trim();
        setIsLoading(true);
        if(input) {
            addMessage(Constants.Roles.User, input);
            inputRef.current.value = "";
            // const resp = await fetch("https://api.wit.ai/message?q=" + encodeURIComponent(input), {
            //     headers: {
            //         "Authorization": "Bearer " + CS571_WITAI_ACCESS_TOKEN
            //     }
            // })
            const resp = await get_api(input);
            
            console.log(resp);
            if(resp[0]['function']['name'] === 'get_help'){
                addMessage(Constants.Roles.Assistant, 'You can get a list of chatrooms or latest msg!')
            }
            else if(resp[0]['function']['name'] === 'get_chatrooms'){
                fetch('https://cs571.org/rest/s25/hw10/chatrooms',{
                    headers:{
                        "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
                        
                    }
                })
                .then(res => res.json())
                .then(data => {
                    addMessage(Constants.Roles.Assistant, 'You can visit ' + data);
                })
            }
            else if(resp[0]['function']['name'] === 'get_msg'){
                const num = JSON.parse(resp[0]['function']['arguments'])['num'];
                const chat_room = encodeURIComponent(JSON.parse(resp[0]['function']['arguments'])['chatroom']);
                // console.log(chat_room);
                fetch(`https://cs571.org/rest/s25/hw10/messages?chatroom=${chat_room}&num=${num}`,{
                    headers:{
                        "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
                    }
                })
                .then(res => 
                    {console.log(res.status);
                    return res.json()})
                .then(data => {
                    console.log(data);
                    addMessage(Constants.Roles.Assistant,"can't get msg back, i doubt the api have some issue!")
                })
            }
            else{
                addMessage(Constants.Roles.Assistant, resp);

            }
    

        }
        setIsLoading(false);
    }

    /**
     * Adds a message to the ongoing TextAppMessageList
     * 
     * @param {string} role The role of the message; either "user" or "assistant"
     * @param {*} content The content of the message
     */
    function addMessage(role, content) {
        setMessages(o => [...o, {
            role: role,
            content: content
        }]);
    }

    useEffect(() => {
        handleWelcome();
    }, []);

    return (
        <div className="app">
            <TextAppMessageList messages={messages}/>
            {isLoading ? <BeatLoader color="#36d7b7"/> : <></>}
            <div className="input-area">
                <Form className="inline-form" onSubmit={handleSend}>
                    <Form.Control
                        ref={inputRef}
                        style={{ marginRight: "0.5rem", display: "flex" }}
                        placeholder="Type a message..."
                        aria-label='Type and submit to send a message.'
                    />
                    <Button type='submit' disabled={isLoading}>Send</Button>
                </Form>
            </div>
        </div>
    );
}

export default TextApp;
