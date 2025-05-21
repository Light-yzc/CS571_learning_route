import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import call_api from './get_api'; 
import TextAppMessageList from './TextAppMessageList';
import Constants from '../constants/Constants';

const CS571_WITAI_ACCESS_TOKEN = ""; // Put your CLIENT access token here.

function TextApp() {

async function call_api1(text) {
    try {
        const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
            method: 'POST',
            headers: {    
                "Authorization": "Bearer sk-mgkfjqalvkxluauddjmajbwzlxrcbxoqrdobatpwttztrmta",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek-ai/DeepSeek-V3",
                messages: [{ role: "user", content: text }],
                max_tokens: 50,
                temperature: 0.7,
                response_format: { type: "text" },
                tools: [{
                    type: "function",
                    function: {
                        name: "get_joke",
                        description: "是否根据用户输入调用get_joke函数",
                        parameters: {},
                    }
                }]
            })
        });
        const data = await response.json();
        
        if (data.choices[0]?.message?.tool_calls) {
            return '$call func'; // ✅ 直接返回，让外层处理
        } else {
            return data.choices[0].message.content; // ✅ 返回 API 回复
        }
    } catch (error) {
        console.error("API 调用失败:", error);
        return "出错了，请重试！";
    }
}
    // Set to true to block the user from sending another message
    const [isLoading, setIsLoading] = useState(false);

    const [messages, setMessages] = useState([]);
    const inputRef = useRef();

    /**
     * Called when the TextApp initially mounts.
     */
    async function handleWelcome() {
        addMessage(Constants.Roles.Assistant,'Hello there! welcome to ICE-VOICEDEV1')

    }

    /**
     * Called whenever the "Send" button is pressed.
     * @param {Event} e default form event; used to prevent from reloading the page.
     */
    async function handleSend(e) {
        e?.preventDefault();
        const input = inputRef.current.value?.trim();
        if (input){
            setIsLoading(true);
            addMessage(Constants.Roles.User, input);
            inputRef.current.value = '';
            const res = await call_api(input);
            console.log(res);
            if (res === '$call func'){
                const res = await fetch(`https://v2.jokeapi.dev/joke/any?safe-mode&amount=1`)
                const data = await res.json();
                if(data.type === 'single'){
                    addMessage(Constants.Roles.Assistant, data.joke);
                }
                else{
                    addMessage(Constants.Roles.Assistant, data.setup + data.delivery);
                }
            }
            else{
                addMessage(Constants.Roles.Assistant, res)
            }
            setIsLoading(false);
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
