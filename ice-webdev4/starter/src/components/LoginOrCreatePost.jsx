import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function LoginOrCreatePost(props) {
    
    // Note! You should use this in combination with sessionStorage.
    // Otherwise, when the user refreshes the page, it will go away!
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [username, setname] = useState('');
    // const [password,setpwd] = useState('');
    const name_ref = useRef();
    const pwd_ref = useRef();
    const comment_ref = useRef();
    function handleLoginSubmit(e) {
        e?.preventDefault();  // prevents default form submit action
        fetch('https://cs571.org/rest/s25/ice/login',{
            method:'POST',
            credentials:'include',
            headers:{
            "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
            'Content-Type':'application/json'

            },
            body:JSON.stringify({
                username:name_ref.current.value,
                password:pwd_ref.current.value
            })
        })
        .then(res => {
            // console.log(username);
            // console.log(password);
            if (res.status == 200){
                alert('login succesful');
                setIsLoggedIn(true);
            }

            else{
                alert('something goes wrong');
            }
        })
        
        // TODO: POST to https://cs571api.cs.wisc.edu/rest/s25/ice/login
    }

    function handleCommentSubmit(e) {
        e?.preventDefault(); // prevents default form submit action
        fetch('https://cs571.org/rest/s25/ice/comments', {
            method:'POSt',
            credentials:'include',
            headers:{
            "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                comment:comment_ref.current.value
            })
        })
        .then(res => {
            if (res.status === 200){
                alert('comment succesfully');
                props.refreshComments();
            }
            else{ 
                alert('failed');
            }
        })
        // TODO: POST to https://cs571api.cs.wisc.edu/rest/s25/ice/comments
    }

    function handleLogout() {
        // TODO POST to https://cs571api.cs.wisc.edu/rest/s25/ice/logout
        fetch('https://cs571.org/rest/s25/ice/logout', {
            method:'POST',
            credentials:'include',
            headers:{
            "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',

            },
        })
        .then(res => {
            if (res.status === 200){
                alert('logout');
                setIsLoggedIn(false);   

            }
            else{
                alert('logout failed');
            }
        })
    }

    if (isLoggedIn) {
        return <>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
            <Form onSubmit={handleCommentSubmit}>
                <Form.Label htmlFor="commentInput">Your Comment</Form.Label>
                <Form.Control id="commentInput" ref={comment_ref}></Form.Control>
                <br/>
                <Button type="submit" onClick={handleCommentSubmit}>Post Comment</Button>
            </Form>
        </>
    } else {
        return <Form onSubmit={handleLoginSubmit}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput"  ref={name_ref}></Form.Control>
            <Form.Label htmlFor="passwordInput">Password</Form.Label>
            <Form.Control id="passwordInput" type="password"  ref={pwd_ref}></Form.Control>
            <br/>
            <Button type="submit" onClick={handleLoginSubmit}>Login</Button>
        </Form>
    }
}