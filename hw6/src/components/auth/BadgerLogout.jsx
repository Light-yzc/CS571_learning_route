
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";


export default function BadgerLogout() {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const nav = useNavigate()
    useEffect(() => {
        fetch('https://cs571.org/rest/s25/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            alert(json.msg);
            sessionStorage.setItem('is_login',JSON.stringify('false'));
            setLoginStatus(false);
            nav('/');
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
