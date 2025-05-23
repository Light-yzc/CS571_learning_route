import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';

import TextAppMessageList from './TextAppMessageList';
import Constants from '../constants/Constants';
function TextApp() {
    // Set to true to block the user from sending another message
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([{
        'role':'assistant',
        'content':'你是一个猫娘'
    }]);
    const inputRef = useRef();

    /**
     * Called when the TextApp initially mounts.
     */


    async function handleWelcome() {
        if (messages.length === 0) {
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
            const res  = await fetch('https://api.siliconflow.cn/v1/chat/completions',{
                method:'POST',
                headers:{Authorization: 'Bearer sk-jkegpyuwpjndirksbzwvqckpuemxdmkbdrkijpuwoytvfzhj', 'Content-Type': 'application/json'},
                body:JSON.stringify({"model": "deepseek-ai/DeepSeek-V3",
                "messages":[...messages, {
                'role':'user',
                'content':input
            }],
                "stream": true,
                "max_tokens": 512,
                "enable_thinking": false,
                "thinking_budget": 4096,
                "min_p": 0.05,
                "stop": null,
                "temperature": 0.7,
                "top_p": 0.7,
                "top_k": 50,
                "frequency_penalty": 0.5,
                "n": 1,
                "response_format": {"type": "text"},
                "tools": [
                    {
                        "type": "function",
                        "function": {
                            "description": "<string>",
                            "name": "<string>",
                            "parameters": {},
                            "strict": false
                        }
                    }
                ]
            })
            })
            const reader = res.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let done = false;
            while(!done){
                const data_bin = await reader.read();
                done = data_bin.done;
                if (done) break;
                const value = data_bin.value;
                if(value){
                    let data_str = decoder.decode(value, {stream:true});
                    console.log(data_str);
                    data_str = data_str.split('\n').filter(data => data.trim() != '');
                    data_str = data_str.map(data => {
                        const obj_data = data.replace(/^data: /,'');
                        return JSON.parse(obj_data);
                    })
                    // const data_str = JSON.parse(decoder.decode(value, {stream:true}));
                    data_str.map(data => {
                        console.log(data.choices[0].delta.content)
                    })
                }
            }
            // TODO Perform a POST request to the HW11 Completions API
            //      https://cs571api.cs.wisc.edu/rest/s25/hw11/completions
            //      and display the response to the user.

        }
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
