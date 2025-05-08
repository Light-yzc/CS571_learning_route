import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import TicketLane from './TicketLane'
import TicketContext from "../contexts/TicketContext";

const TicketBoard = (props) => {

    const [ticketLanes, setTicketLanes] = useState({
        todo: [],
        inprogress: [],
        done: [],
    })

    useEffect(() => {
        fetch('https://cs571api.cs.wisc.edu/rest/s25/ice/tickets', {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
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

    return <div>
        <h1>Ticket Board</h1>
        <TicketContext.Provider value={[ticketLanes, setTicketLanes]}>
            <Container fluid>
                {
                    Object.keys(ticketLanes).map(laneName => {
                        return <TicketLane
                            key={laneName}
                            status={laneName}
                            tickets={ticketLanes[laneName]}
                        />
                    })
                }
            </Container>
        </TicketContext.Provider>
    </div>
}

export default TicketBoard;