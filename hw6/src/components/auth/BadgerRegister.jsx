import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router';

export default function BadgerRegister() {
    const [name,setname] = useState('');
    const [pwd, setpwd] = useState('');
    const navigate = useNavigate();

    // TODO Create the register component.
    function register(name, pwd){
    let re = /^\d{7}$/;
    if (!re.test(pwd)){
        alert("Your pin must be a 7-digit number!");
        return 0;
    }
    if (name.length === 0 || pwd.length === 0){
        alert("You must provide both a username and pin!");
        return 0;
        }

    

        fetch('https://cs571.org/rest/s25/hw6/register',
            {
                credentials:'include',
                method:'POST',
                headers:{
                    "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
                    'Content-Type':'application/json'
                    },
                body:JSON.stringify({
                    username: name,
                    pin: pwd
                })
            }
        )
        .then(res => {
            if (res.status === 200){
                alert('registerd');
                sessionStorage.setItem('is_login', JSON.stringify(true))
                navigate('/');
                return Promise.reject('Handled 200'); // 阻止后续 .then 执行
            }

            return res.json()})
        .then(res => {
                alert(res.msg);
        })
    }

    return <>
        <h1>Register</h1>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput"  value={name} onChange={(e) => setname(e.target.value)}></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password" value={pwd} onChange={(e => setpwd(e.target.value))}></Form.Control>
            <br/>
            <Button type="submit" onClick={() =>register(name, pwd)}>Register</Button>
    </>
}
