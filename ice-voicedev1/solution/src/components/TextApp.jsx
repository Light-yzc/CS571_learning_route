import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';

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
        addMessage(Constants.Roles.Assistant, "Welcome, I'm an agent that tells funny jokes.");
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
            const resp = await fetch("https://api.wit.ai/message?q=" + encodeURIComponent(input), {
                headers: {
                    "Authorization": "Bearer " + CS571_WITAI_ACCESS_TOKEN
                }
            })
            const data = await resp.json();
            console.log(data);

            const matchedName = data.intents[0]?.name;
            if (!matchedName) {
                addMessage(Constants.Roles.Assistant, "I'm sorry, I don't understand!");
            } else if (matchedName === "why_chicken") {
                addMessage(Constants.Roles.Assistant, "To get to the other side!");
            } else if (matchedName === "tell_joke") {
                await tellJoke(data);
            } else {
                addMessage(Constants.Roles.Assistant, "This should never happen!");
            }
        }
        setIsLoading(false);
    }

    async function tellJoke(witData) {
        const hasSpecifiedType = witData.entities["joke_type:joke_type"] ? true : false;
        const hasSpecifiedNumber = witData.entities["wit$number:number"] ? true : false;

        const jokeType = hasSpecifiedType ? witData.entities["joke_type:joke_type"][0].value : "any";

        // Note! A number could be a decimal number, or it could be negative.
        //       We should probably check for this...
        const numJokes = hasSpecifiedNumber ? witData.entities["wit$number:number"][0].value : 1;

        const res = await fetch(`https://v2.jokeapi.dev/joke/${jokeType}?safe-mode&amount=${numJokes}`)
        const data = await res.json();

        // Special Case: If you only ask for 1 joke, the API returns just an object rather than a list.
        const listOfJokes = numJokes === 1 ? [data] : data.jokes;

        for(let iJoke of listOfJokes) {
            if (iJoke.type === 'single') {
                addMessage(Constants.Roles.Assistant, `${iJoke.joke}`);
            } else {
                addMessage(Constants.Roles.Assistant, `${iJoke.setup} ${iJoke.delivery}`);
            }
        }
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
