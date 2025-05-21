import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerLayout(props) {

    // TODO @ Step 6:
    // You'll probably want to see if there is an existing
    // user in sessionStorage first. If so, that should
    // be your initial loginStatus state.
    const is_login = sessionStorage.getItem('is_login');
    const log_sta = is_login === 'true'; // 如果 is_login 是字符串 "true"，则设置为 true，否则为 false
    const [loginStatus, setLoginStatus] = useState(log_sta);
    // const [loginStatus, setLoginStatus] = useState(undefined);
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {loginStatus? <></>:<Nav.Link as={Link} to="login">Login</Nav.Link>}
                        {loginStatus? <></> :<Nav.Link as={Link} to="register">Register</Nav.Link>}
                        {loginStatus? <Nav.Link as={Link} to='logout'>Logout</Nav.Link>:<></>}
                        <NavDropdown title="Chatrooms">
                        {console.log(props.chatrooms)}
                            {props.chatrooms.map(room => {
                                return <NavDropdown.Item eventKey={room} as={Link} to={`chatrooms/${room}`}>{room}</NavDropdown.Item>
                            })
                                
                                /* TODO Display a NavDropdown.Item for each chatroom that sends the user to that chatroom! */
                            }
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;