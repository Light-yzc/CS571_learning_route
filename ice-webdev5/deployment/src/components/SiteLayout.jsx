import { Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router";

export default function SiteLayout(props) {
    return <div>
        <Navbar>
            <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/my-work">My Work</Nav.Link>
            </Nav>
        </Navbar>
        <div style={{ margin: "1em" }}>
            <Outlet />
        </div>
    </div>

}