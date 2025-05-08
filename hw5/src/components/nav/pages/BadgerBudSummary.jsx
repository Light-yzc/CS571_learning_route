import { useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";

export default function CatsInfo(props){
    const[btn_sta,cha_btn] = useState(false);
    function change_btn(){
        if (btn_sta){
            cha_btn(false)
        }
        else{
            cha_btn(true)
        }
    }
    return(
        <>
        <Card>
        {btn_sta?
        <Carousel>
        {props.imgIds.map(id => {return <Carousel.Item><img src={"https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/" + id} width={200} height={200}/></Carousel.Item>})}
        </Carousel>:
        <img src={"https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/" + props.imgIds[0]} width={200} height={200}/>
}

        <h2>{props.name}</h2>
        <div>
            <Button onClick={change_btn}>{btn_sta? 'Hide':'Show more'}</Button> <Button className="btn btn-info" onClick={()=>props.save(props.name, props.id)}> ❤️❤️Save</Button>
        </div>
        </Card>
        {/* <Card> */}
        {btn_sta? (
            <div>
            <p>{props.gender}</p>
            <p>{props.breed}</p>
            <p>{props.age}</p>
            <p>{props.description}</p>
            </div>
        ):''}
        {/* </Card> */}
        <p></p>

    </>
    );

}