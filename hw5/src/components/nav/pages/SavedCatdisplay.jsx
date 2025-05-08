import { Button, Card } from 'react-bootstrap'
export default function(props){
    return(
        <Card>
        <img src={"https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/" + props.imgIds[0]} width={200} height={200}/>
        <h2>{props.name}</h2>
        <div>
            <Button onClick={()=>{props.unadopt(props.id)}}>Unselect</Button>

            <Button onClick={() => {props.adopt(props.name, props.id)}}>💕Adopt</Button>
        </div>
        </Card>
    )
}