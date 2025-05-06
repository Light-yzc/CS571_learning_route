import { useState } from "react";
import { Button, Card } from "react-bootstrap";

export default function Recipe(props) {
    const [Likes, setLikes] = useState(0)
    function IncreaseLikes (){
        setLikes(Likes + 1)
        
    }
    return <div>
        <h3>{props.name}</h3>
        <p>{props.author}</p>
        <p>You have {Likes} Likes ❤️❤️</p>
        <Button onClick={IncreaseLikes}>Like this recipe</Button>
        </div>
}