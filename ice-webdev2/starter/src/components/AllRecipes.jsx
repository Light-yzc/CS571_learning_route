import { useEffect, useState } from "react";
import Recipe from "./Recipe";

// import { Container } from "react-bootstrap/lib/Tab";
import { Container, Pagination } from "react-bootstrap";

import { Col, Row } from "react-bootstrap";
// import PaginationItem from "react-bootstrap/lib/PaginationItem";
// import {PaginationItem} from "react-bootstrap/Pagination";



export default function AllRecipes(props) {

    // Is there a better way to do this? We'll explore this today!
    const [recipes, setrecipes] = useState([]);
    const [page,setpage] = useState(1);
    useEffect(() => {

        // Which fetch will complete first? No one knows!

        fetch("https://cs571.org/rest/s25/ice/all-recipes", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            setrecipes(data);
    }, []);
}

)
    const subrecipe = recipes.slice((page - 1) * 3 , page * 3);
    return <div>
        <h1>Welcome to Badger Recipes!</h1>
        <Container>
            <Row>
            {recipes.length > 0 ?  subrecipe.map( r => <Col xs = {12} md = {6} lg = {4} key = {r.name}><Recipe  {...r} /> </Col>) : <p>Still loading</p>}
            {/* <Col xs = {12} md = {6} lg = {4}>haha</Col> */}
            </Row>
        </Container>
        <Pagination>
            <Pagination.Item active = {page === 1} onClick={() => setpage(1)}>1</Pagination.Item>
            <Pagination.Item active = {page === 2} onClick={() => setpage(2)}>2</Pagination.Item>
        </Pagination>
    </div>
}