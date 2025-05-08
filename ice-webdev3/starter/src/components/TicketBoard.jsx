import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import TicketLane from './TicketLane'

const TicketBoard = (props) => {

    const [ticketLanes, setTicketLanes] = useState({
        todo: [],
        inprogress: [],
        done: [],
    })

    useEffect(() => {
        fetch('https://cs571.org/rest/s25/ice/tickets', {
            headers: {
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba '
            }
        })
        .then(res => res.json())
        .then(ticketData => {
            console.log(ticketData);
            setTicketLanes({
                todo: ticketData,
                inprogress: [],
                done: []
            });
        })
    }, []);

    function move_to(from, to, tickId){
        setTicketLanes(oldLanes => {
            let from_lane = oldLanes[from];
            let to_lane = oldLanes[to];
            
            let change_item = from_lane.find(item => item.id === tickId);
            let new_lane = {...oldLanes};
            new_lane[from] = from_lane.filter(item => item.id != tickId);
            new_lane[to] = [...to_lane, change_item];
            return new_lane;
            // let fromLane = oldLanes[from]; // this is just a reference copy! be sure not to change it!
            // let toLane = oldLanes[to]; // this is just a reference copy! be sure not to change it!
            // const ticketToMove = fromLane.find(tick => tick.id === tickId);

            // const newLanes = {...oldLanes};
            // newLanes[from] = fromLane.filter(tick => tick.id !== tickId); // remove ticket from old lane...
            // newLanes[to] = [...toLane, ticketToMove]; // and place it in the new lane!

            // return newLanes;
            
        })
    }

    return <div>
        <h1>Ticket Board</h1>
        <Container fluid>
            {
                Object.keys(ticketLanes).map(laneName => {
                    return <TicketLane
                        key={laneName}
                        status={laneName}
                        tickets={ticketLanes[laneName]}
                        move={move_to} 
                    />
                })
            }
        </Container>
    </div>
}

export default TicketBoard;