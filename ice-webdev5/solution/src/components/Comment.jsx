import { memo, useCallback, useMemo } from "react";
import { Button, Card } from "react-bootstrap";

const Comment = (props) => {

    console.log("I have rendered!")

    const createdDt = useMemo(() => new Date(props.created), [props.created]);

    return <Card style={{margin: "0.5rem"}}>
        <p>{props.comment}</p>
        <p>Posted on {createdDt.toLocaleDateString()} at {createdDt.toLocaleTimeString()} by {props.author}</p>
        {
            props.isLoggedIn ? <Button onClick={() => props.handleCopyComment(props.comment)} variant="secondary">Copy Comment</Button> : <></>
        }
    </Card>
}

export default memo(Comment);