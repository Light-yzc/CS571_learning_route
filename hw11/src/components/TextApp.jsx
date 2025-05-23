import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import msg from './msg';
import TextAppMessageList from './TextAppMessageList';
import Constants from '../constants/Constants';

function TextApp(props) {
    // Set to true to block the user from sending another message
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useContext(msg);
    const inputRef = useRef();
    /**
     * Called when the TextApp initially mounts.
     */
    async function handleWelcome(persona) {
            addMessage(Constants.Roles.Developer,persona.prompt);
            addMessage(Constants.Roles.Assistant,persona.initialMessage);  
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
            const res = await fetch('https://api.siliconflow.cn/v1/chat/completions',{
                method:'POST',
                headers:{Authorization: 'Bearer <your token>', 'Content-Type': 'application/json'},
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
        addMessage(Constants.Roles.Assistant, '');
        let done = false
        const data_bin = res.body.getReader()
        const decode1 = new TextDecoder('utf-8');
        while(!done){
            const data_bin_tmp = await data_bin.read();
            const value_bin = data_bin_tmp.value;
            done = data_bin_tmp.done;
            if(value_bin){
                let data = decode1.decode(value_bin,{ stream: true });
                data = data.split('\n').filter(data => data.trim() != '').map(data => {
                      try {return JSON.parse(data.replace(/^data: /,''));} catch {} // 空的catch块会吞噬所有错误
                    
                })
                data.map(d => {
                    if(d.choices[0].delta.content != null) try{add_cur(d.choices[0].delta.content);} catch{}

                })
                // if(messages[messages.length-1].role === Constants.Roles.User){
                // }
            setIsLoading(false);
            }
        }
        }
    }
    if (messages.length >= 3){
    localStorage.setItem('chat_history', JSON.stringify(messages));
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
    function add_cur(msg){
        setMessages(o =>{
            const new_o = [...o]
            new_o[new_o.length-1].content = new_o[new_o.length-1].content + msg;
            return new_o;
        })
    }
    const person1 = props.name
    useEffect(() => {
        const PERSONAS = props.PERSONAS
        const local_chat_history = JSON.parse(localStorage.getItem('chat_history'))
        if(local_chat_history.length > 2 && localStorage.getItem('persona') === person1){
            setMessages(local_chat_history);
            console.log(local_chat_history.length);
        }
        else{
        const persona =  PERSONAS.find(p => p.name === person1);
        console.log(persona);

        setMessages([]);
        handleWelcome(persona);
        localStorage.setItem('chat_history', JSON.stringify(messages));
        localStorage.setItem('persona', person1);
        console.log(persona)
        }

    }, [person1]);
    
    useEffect(()=>{

    },[])


    return (
        <div className="app">
            <TextAppMessageList messages={messages}/>
            {isLoading ? <BeatLoader color="#36d7b7"/> : <></>}
            <div className="input-area">
                <msg.Provider value={[messages, setMessages]}>
                <Form className="inline-form" onSubmit={handleSend}>
                    <Form.Control
                        ref={inputRef}
                        style={{ marginRight: "0.5rem", display: "flex" }}
                        placeholder="Type a message..."
                        aria-label='Type and submit to send a message.'
                    />
                    <Button type='submit' disabled={isLoading}>Send</Button>
                </Form>
                </msg.Provider>
            </div>
        </div>

    );
}

export default TextApp;
