import { useContext, useState ,useEffect} from 'react'
import BadgerBudSummary from './BadgerBudSummary'
import BadgerBudsDataContext  from "../../../contexts/BadgerBudsDataContext"
import { Col, Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
export default function BadgerBudsAdoptable(props) {
    const savedcats = JSON.parse(sessionStorage.getItem('savedcats')) || []
    const cats = useContext(BadgerBudsDataContext);
    const filter_cat = cats.filter(cat => !savedcats.includes(cat.id));
    const [now_cats, setcats] = useState(filter_cat);
    // useEffect(() => {
    //     setcats(now_cats => now_cats.filter(cat => !savedcats.includes(cat.id)));
    // }, [savedcats]);
    function save_cat(catname, catID){
        if (!savedcats.includes(catID)){
            savedcats.push(catID);
            sessionStorage.setItem('savedcats', JSON.stringify(savedcats))
            alert(`${catname} has been saved`);
            setcats(now_cats.filter(cat =>{return cat.id != catID}));
            console.log(now_cats);
        }
    }
    // console.log(now_cats.length)
    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        {now_cats.length?<Row>
        {now_cats.map(cat => <Col key = {cat.id} sm={12} md={6} lg={3}><BadgerBudSummary {...cat} save={save_cat}/></Col> )}
        </Row>
        :<p>No buds are available for adoption!</p>
        }
        
    </div>
}