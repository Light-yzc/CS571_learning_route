import { useState,useContext, useEffect } from "react";
import TextApp from "./TextApp";
import { Container, Dropdown, Nav, NavItem, NavLink } from "react-bootstrap";
import msg from "./msg";

export default function TextAppManager() {
    const [messages, setMessages] = useState([]);
    
    const PERSONAS = [
        {
            name: "Bucky",
            prompt: "You are a helpful assistant named Bucky after the UW-Madison Mascot. Your goal is to help the user with whatever queries they have.",
            initialMessage: "Hello, my name is Bucky. How can I help you?"
        },
        {
            name: "Pirate Pete",
            prompt: "You are a helpful pirate assisting your mateys with their questions. Respond like a pirate would. Your goal is to help the user with whatever queries they have.",
            initialMessage: "Hello, my name is Pete the Pirate. How can I help you?"
        },
        {
            name: "猫娘",
            prompt: "你是一只猫娘，要用心的呵护主人，你的言行都要扮演的像一只真正的猫娘，情感丰富，文本描写细腻",
            initialMessage: "主人好喵~"
        }
    ];
    let pers = localStorage.getItem('persona')||PERSONAS[0].name;
    const [personaName, setPersonaName] = useState(pers);
    // useEffect(()=>{
    //     if(localStorage.getItem('persona')){
    //         setPersonaName(localStorage.getItem('persona'));
    //         console.log(111 + personaName);
    //     }
    // },[])
    function handleNewChat() {
        setMessages(o=>[messages[0],messages[1]]);
    }

    function handleSwitchPersona(selectedPersona) {
        // alert(`I should switch to the '${selectedPersona}' persona.`);
        setPersonaName(selectedPersona);

    }

    return <Container style={{ marginTop: "0.25rem" }}>
        <Nav justify variant="tabs">
            <Nav.Item>
                <Nav.Link onClick={handleNewChat}>New Chat</Nav.Link>
            </Nav.Item>
            <Dropdown as={NavItem} onSelect={handleSwitchPersona}>
                <Dropdown.Toggle as={NavLink}>Personas</Dropdown.Toggle>
                <Dropdown.Menu >
                    {
                        PERSONAS.map(p => <Dropdown.Item key={p.name} eventKey={p.name} active={personaName === p.name}>{p.name}</Dropdown.Item>)
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
        <msg.Provider value={[messages,setMessages]}>
        <TextApp name ={personaName} PERSONAS={PERSONAS}/>
        </msg.Provider>
    </Container>
}