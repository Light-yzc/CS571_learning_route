import { useContext, useState } from "react";
import BadgerBudsDataContext  from "../../../contexts/BadgerBudsDataContext"
import Save_Cat from './SavedCatdisplay'
import { Col, Row } from "react-bootstrap";
export default function BadgerBudsBasket(props) {
    let saved_cat = JSON.parse(sessionStorage.getItem('savedcats')) || [];
    const total_cat = useContext(BadgerBudsDataContext);
    const [display_cat,set_cat] = useState(total_cat.filter(cat => saved_cat.includes(cat.id)));
    function unadopt(catid){
        const new_cat = saved_cat.filter(cat => cat != catid);
        sessionStorage.setItem('savedcats', JSON.stringify(new_cat));
        set_cat(display_cat.filter(cat_ => new_cat.includes(cat_.id)));
    }
    function  adopt(name, catid) {
        set_cat(display_cat.filter(cat_1 => cat_1.id != catid));
        const is_saved = saved_cat.filter(cat => !cat.includes(catid));
        sessionStorage.setItem('savedcats', JSON.stringify(is_saved));
        alert(`Thank you for adopting ${name}😽😽😽😼😼`);   

    }
    console.log(saved_cat);
    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        {saved_cat.length? 
        <Row>
        {display_cat.map(cat => <Col key = {cat.id} sm={12} md={6} lg={3}>
        <Save_Cat {...cat} unadopt={unadopt} adopt={adopt}/>
        </Col>)}
        </Row>
        :
        <p>You have no buds in your basket!</p>
        }
    </div>
}