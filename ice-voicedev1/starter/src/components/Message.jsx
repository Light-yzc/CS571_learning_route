
const Message = (props) => {
    return <div
            className={props.role + "-message"}
            style={{width: "fit-content", maxWidth: "80%", display: "inline-block"}}
        >
        <p>{props.content}</p>
    </div>
}

export default Message;