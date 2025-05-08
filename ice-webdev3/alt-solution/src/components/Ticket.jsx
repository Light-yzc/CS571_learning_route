import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import TicketContext from "../contexts/TicketContext";

const Ticket = (props) => {

    const [ticketLanes, setTicketLanes] = useContext(TicketContext);

    const move = (from, to, tickId) => {
        console.log(`Moving ${tickId} from lane ${from} to lane ${to}!`)
        
        if (from === to) {
            return;
        }

        setTicketLanes(oldLanes => {
            // Be sure NOT to change oldLanes directly!
            let fromLane = oldLanes[from]; // this is just a reference copy! be sure not to change it!
            let toLane = oldLanes[to]; // this is just a reference copy! be sure not to change it!
            const ticketToMove = fromLane.find(tick => tick.id === tickId);

            const newLanes = {...oldLanes};
            newLanes[from] = fromLane.filter(tick => tick.id !== tickId); // remove ticket from old lane...
            newLanes[to] = [...toLane, ticketToMove]; // and place it in the new lane!

            return newLanes;
        })
    }

    const markTodo = () => {
        move(props.status, "todo", props.id)
    }

    const markInProgress = () => {
        move(props.status, "inprogress", props.id)
    }

    const markDone = () => {
        move(props.status, "done", props.id)
    }

    return <Card style={{margin: "0.25rem"}}>
        <h2 style={{fontSize: "1.25rem"}}>{props.name}</h2>
        <sub>{props.author}</sub>
        <br/>
        <p>{props.description}</p>
        <Button variant="secondary" onClick={markTodo}>todo</Button>
        <Button variant="primary" onClick={markInProgress}>in progress</Button>
        <Button variant="success" onClick={markDone}>done</Button>
    </Card>
}

export default Ticket;