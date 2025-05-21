import React, { useEffect, useState ,useContext} from "react"
import { Card, Col, Pagination, Row ,Form,Button} from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import context from "react-bootstrap/esm/AccordionContext";
import BadgerMessage from "./BadgerMessage";


export default function BadgerChatroom(props) {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const [titles, set_t] = useState('');
    const [contents,set_c] = useState('');
    const [messages, setMessages] = useState([]);
    const [cur_page,setpage] = useState(1);
    const page_msg = messages.slice((cur_page - 1) * 9, cur_page * 9);
    const loadMessages = () => {
        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}&page=1`, {
            headers: {
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba'
            }
        })
        // .then(res => console.log(res.status))
        .then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };
    function change_page(n){
        setpage(n);
    }
    function del_post(msg_id){
        fetch(`https://cs571.org/rest/s25/hw6/messages?id=${msg_id}`,{
            method:'DELETE',
            credentials:'include',
            headers:{
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba'
            }
        })
        .then(res => {
            if(res.status === 200){
                alert('Delete succesfully!');
                loadMessages();
                return Promise.reject('Handled 200'); // 阻止后续 .then 执行

            }
            return res.json();
        })
        .then(res =>{
            alert(res.msg);
        })
    }
    function send_post(titles, contents){

        fetch(`https://cs571.org/rest/s25/hw6/messages?chatroom=${props.name}`,{
            method:'POST',
            credentials:'include',
            headers:{
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            title: titles,
            content: contents
        })
        })
        .then(res => {
            if(res.status === 200){
                alert('you msg had been postd');
                loadMessages();
            }
            else{
                alert('something goes wrong');
            }
        })
        
    }
    // console.log(messages.splice(0,9))

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props]);
    return (<>
        <h1>{props.name} Chatroom</h1>
        {
            loginStatus ?
            <div>
                <Form.Label>Post Title</Form.Label>
                <Form.Control id='title' val={titles} onChange={e => set_t(e.target.value)}></Form.Control>
                <Form.Label>Content</Form.Label>
                <Form.Control id='Content' val={contents} onChange={e => set_c(e.target.value)}></Form.Control>
                <br />
                <Button onClick={() => send_post(titles,contents)}>POST</Button>
            </div>
            :
            <h3>Error:Pleas login to comment</h3>
            /* TODO: Allow an authenticated user to create a post. */
        }
        <hr/>
        {
            page_msg.length > 0 ?
            <>

                <Row>
                    {page_msg.map(post => { return (<Col xs={12} sm={6} md={6} lg={3} key={post.id}><BadgerMessage {...post} del={del_post}></BadgerMessage></Col>)}

                    // return (<Col xs={12} sm={6} md={6} lg={4}>
                    // <Card>
                    //     <h2>
                    //         {post.content}
                    //     </h2>
                    //     <p>Posted by {post.created}</p>
                    //     {/* <br /> */}
                    //     <p>{post.poster}</p>
                    //    </Card>
                    //    <br />
                    //    </Col>)}  
                       )

                        /* TODO: Complete displaying of messages. */
                    }
                </Row>
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <Pagination>
            <Pagination.Item active={cur_page === 1} onClick={() => change_page(1)}>1</Pagination.Item>
            <Pagination.Item active={cur_page === 2} onClick={() => change_page(2)}>2</Pagination.Item>
            <Pagination.Item active={cur_page === 3} onClick={() => change_page(3)}>3</Pagination.Item>
            <Pagination.Item active={cur_page === 4} onClick={() => change_page(4)}>4</Pagination.Item>
        </Pagination>
    </>
)}