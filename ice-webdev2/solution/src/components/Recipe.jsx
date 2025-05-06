import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import Stopwatch from "../utils/Stopwatch";

export default function Recipe(props) {

    const [likes, setLikes] = useState(0);

    function handleLike() {
        setLikes(oLikes => oLikes + 1)
    }

    return <Card style={{margin: "auto", marginTop: "1rem", maxWidth: "40rem"}}>
        <img src={props.img.location} alt={props.img.description}/>
        <h2>{props.name}</h2>
        <p>by {props.author} | <strong>{likes} likes</strong></p>
        <p>described as {props.keywords.join(", ")}</p>
        <Button onClick={handleLike}>Like this Recipe</Button>
    </Card>
}