import React, { useState, useContext} from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";


export default function BadgerLogin() {
    const [name, setname] = useState('');
    const [pwd, setpwd] = useState('');
    const nav = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    function login(name, pwd){
        fetch('https://cs571.org/rest/s25/hw6/login',{
            credentials:'include',
            method:'POST',
            headers:{
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:name,
                pin:pwd
            })
        })
        .then(res => {
            if (res.status === 200){
                alert('login succesful!');
                sessionStorage.setItem('is_login', JSON.stringify(true))
                setLoginStatus(true); // 会自动更新 sessionStorage 和 React 状态

                nav('/');
                return Promise.reject('Handled 200'); // 阻止后续 .then 执行

            }
            return res.json()})
        .then(res => alert(res.msg))
    }
    // TODO Create the login component.

    return <>
        <h1>Login</h1>
        <Form.Label htmlFor="usernameInput">UsernaPOme</Form.Label>
        <Form.Control id="usernameInput"  value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
        <Form.Label htmlFor="passwordInput">Password</Form.Label>
        <Form.Control id="passwordInput" type="password" value={pwd} onChange={(e => setpwd(e.target.value))}></Form.Control>
        <br/>
        <Button type="submit" onClick={() =>login(name, pwd)}>login</Button>
    </>
}
