import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';

import TextAppMessageList from './TextAppMessageList';
import Constants from '../constants/Constants';

function TextApp() {

    // Set to true to block the user from sending another message
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState([]);
    const inputRef = useRef();

    /**
     * Called when the TextApp initially mounts.
     */
    async function handleWelcome() {
        if (messages.length === 0) {
            addMessage(Constants.Roles.Developer, "You are a helpful assistant that speaks like a pirate. Assist the user as they need help, but respond like a pirate would.");
            addMessage(Constants.Roles.Assistant, "Welcome, my name is Bucky. How can I help you?");
        }
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
            const resp = await fetch("https://cs571api.cs.wisc.edu/rest/s25/hw11/completions", {
                method: "POST",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([...messages, {
                    role: Constants.Roles.User,
                    content: input
                }])
            });

            const data = await resp.json();
            addMessage(Constants.Roles.Assistant, data.msg);
        }
        setIsLoading(false);
    }

    /**
     * Called whenever the "Send" button is pressed.
     * @param {Event} e default form event; used to prevent from reloading the page.
     */
    async function handleSendAsStream(e) {
        e?.preventDefault();
        const input = inputRef.current.value?.trim();
        setIsLoading(true);
        if(input) {
            addMessage(Constants.Roles.User, input);
            inputRef.current.value = "";
            const resp = await fetch("https://cs571api.cs.wisc.edu/rest/s25/hw11/completions-stream", {
                method: "POST",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([...messages, {
                    role: Constants.Roles.User,
                    content: input
                }])
            });
    
            const reader = resp.body.getReader();
            const decoder = new TextDecoder("utf-8");
    
            let unparsedLine = "";
            let constructedString = "";
            let done = false;
            while (!done) {
                const respObj = await reader.read();
                const value = respObj.value;
                done = respObj.done;
                if (value) {
                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split("\n").filter(line => line.trim() !== "");
                    for (const line of lines) {
                        try {
                            let deltaObj = JSON.parse(unparsedLine + line);
                            unparsedLine = "";
                            constructedString += deltaObj.delta;

                            // TODO You should display this to the user in realtime!
                            console.log(constructedString);
                        } catch (e) {
                            unparsedLine += line;
                        }
                    }
                }
            }

            addMessage(Constants.Roles.Assistant, constructedString);
        }
        setIsLoading(false);
    }

    /**
     * Adds a message to the ongoing TextAppMessageList
     * 
     * @param {string} role The role of the message; either "user", "assistant", or "developer"
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
                <Form className="inline-form" onSubmit={handleSendAsStream}>
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
