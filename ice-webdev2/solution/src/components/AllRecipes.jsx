import { useEffect, useState } from "react";
import Recipe from "./Recipe";

import Stopwatch from "../utils/Stopwatch";
import { Col, Container, Pagination, Row } from "react-bootstrap";

Stopwatch.start();

export default function AllRecipes(props) {

    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/s25/ice/all-recipes", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(r => r.json())
        .then(d => setRecipes(d))
    }, [])

    return <div>
        <h1>Welcome to Badger Recipes!</h1>
        <Container fluid>
            <Row>
                {
                    recipes.slice(((page) - 1) * 3, page * 3).map(r => <Col xs={12} xl={4} key={r.name}>
                        <Recipe {...r} />
                    </Col>)
                }
            </Row>
        </Container>
        <br/>
        <Pagination>
            <Pagination.Item onClick={() => setPage(1)} active={page === 1}>1</Pagination.Item>
            <Pagination.Item onClick={() => setPage(2)} active={page === 2}>2</Pagination.Item>
        </Pagination>
    </div>
}