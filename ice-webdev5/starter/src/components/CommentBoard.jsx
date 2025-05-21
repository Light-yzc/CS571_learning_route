import { useEffect, useState,useCallback} from "react"
import Comment from "./Comment";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import useStorage from '../hook/useSess'
export default function CommentBoard(props) {
    console.log('parent rerender')
    const [inputUsername, setInputUsername] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputComment, setInputComment] = useState("");

    // Note! You should use this in combination with sessionStorage.
    // Otherwise, when the user refreshes the page, it will go away!
    const [isLoggedIn, setIsLoggedIn] = useStorage('login',false);

    const [comments, setComments] = useState([]);

    function refreshComments() {
        fetch("https://cs571.org/rest/s25/ice/comments", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(comms => {
            setComments(comms)
        })
    }

    const handleLoginSubmit = useCallback((e,name,pwd) => {
        e?.preventDefault();

        fetch("https://cs571.org/rest/s25/ice/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: name,
                password: pwd
            })
        })
        .then(res => {
            if (res.status === 200) {
                setIsLoggedIn(true)
            } else {
                alert("Invalid username/password!")
            }
        })
    },[])

    function handleCommentSubmit(e) {
        e?.preventDefault();

        fetch("https://cs571.org/rest/s25/ice/comments", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comment: inputComment
            })
        })
        .then(res => {
            if (res.status === 200) {
                refreshComments();
            } else {
                alert("Did you provide a comment?")
            }
        })
    }

    function handleLogout() {
        fetch("https://cs571.org/rest/s25/ice/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => {
            if (res.status === 200) {
                alert("You have been logged out!")
                setIsLoggedIn(false);
            } else {
                alert("Something went wrong! :/")
            }
        })
    }

    useEffect(() => {
        refreshComments();
    }, [])

    return <div>
        <h1 style={{textAlign: "left"}}>Badger Comments</h1>
        <hr/>
        <Container fluid>
            <Row>
                <Col xs={12} md={6} lg={4} style={{marginBottom: "1rem"}}>
                    {
                        isLoggedIn ? <>
                        <Button variant="danger" onClick={handleLogout}>Logout</Button>
                        <Form onSubmit={handleCommentSubmit}>
                            <Form.Label htmlFor="commentInput">Your Comment</Form.Label>
                            <Form.Control id="commentInput" value={inputComment} onChange={(e) => setInputComment(e.target.value)}></Form.Control>
                            <br/>
                            <Button type="submit" onClick={handleCommentSubmit}>Post Comment</Button>
                        </Form>
                    </> : <Form onSubmit={handleLoginSubmit}>
                        <Form.Label htmlFor="usernameInput">Username</Form.Label>
                        <Form.Control id="usernameInput" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)}></Form.Control>
                        <Form.Label htmlFor="passwordInput">Password</Form.Label>
                        <Form.Control id="passwordInput" type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)}></Form.Control>
                        <br/>
                        <Button type="submit" onClick={(e) => handleLoginSubmit(e,inputUsername,inputPassword)}>Login</Button>
                    </Form>
                    }
                </Col>
                <Col xs={12} md={6} lg={8}>
                    <Container fluid>
                        <Row>
                            {
                                comments.map(c => <Col key={c.id} xs={12} lg={6} xl={4} xxl={3}>
                                    <Comment {...c} />
                                </Col>)
                            }
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    </div>
}