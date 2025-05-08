import { Col, Row } from "react-bootstrap"
import Ticket from "./Ticket";

const TicketLane = (props) => {
    return <div>
        <Row>
            <h2>{props.status} tickets</h2>
            {
                props.tickets.length === 0 ? <p>There are no tickets here yet!</p> :
                props.tickets.map(tick => {
                    return <Col
                        xs={6}
                        md={4}
                        lg={3}
                        xxl={2}
                        key={tick.id}
                    >
                        <Ticket 
                            {...tick}
                            status={props.status}
                            move={props.move}
                        />
                    </Col>
                })
            }
        </Row>
        <br />
    </div>
}

export default TicketLane;