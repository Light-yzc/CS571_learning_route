import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Pagination, Row } from "react-bootstrap";
import Student from "./Student";

const Classroom = () => {
    const[students, setstu] = useState([]);
    const [searchName,setsname] = useState('');
    const [searchMajor, setsmajor] = useState('');
    const [searchInterest, setinters] = useState('');
    const [cur_page, setpage] = useState(1);
    useEffect(() => {
        fetch('https://cs571.org/rest/s25/hw4/students', {
            headers:{
                // "X-CS571-ID": CS571.getBadgerId()
                "X-CS571-ID": 'bid_448a3e9e688764f27b26318433f852fc9a7c91a522a57d3a0a33e906e6fe28ba'
            }
        })
        .then(data => {
            return data.json();
        })
        .then(data => {
            setstu(data);
            console.log(data)
            // console.log(Object.values(data))
        })
    },[])
    function filter_Stu(students1){
        const name_to_search = searchName.trim().toLowerCase();
        const major_to_search = searchMajor.trim().toLowerCase();
        const inter_to_search = searchInterest.trim().toLowerCase();
        const done_name = Object.values(students1.name).filter((stu) => stu.toLowerCase().includes(name_to_search));
        const done_major = students1.major.toLowerCase().includes(major_to_search);
        const done_in = Object.values(students1.interests).filter((stu) => stu.toLowerCase().includes(inter_to_search));
        if (done_name.length != 0 && done_major === true){
            if (done_in.length != 0){
                return students1;
            }
            return false
        }
        else return false
    
    }


    const filteredStudents = students.filter(stu => filter_Stu(stu));
    const paged_stu = filteredStudents.slice((cur_page - 1) * 24, cur_page * 24);
    function page(){
        const pages = Math.floor(filteredStudents.length / 24) + 1;
        // console.log(pages);
        const arr = Array.from({ length: pages }, (_, i) => i + 1);
        return arr;
    }
    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={searchName} onChange={e => setsname(e.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={searchMajor} onChange={e => setsmajor(e.target.value)}/>
            <Form.Label htmlFor="searchInterest" >Interest</Form.Label>
            <Form.Control id="searchInterest" value = {searchInterest} onChange={e => setinters(e.target.value)}/>
            <br />
            <Button variant="neutral" onClick={() =>{setsname('');setsmajor('');setinters('');setpage(1)}}>Reset Search</Button>
            <br />
            <br />
            <p> There are {filteredStudents.length} student(s) matching your search.</p>
        </Form>
        <Container fluid>
            <Row>
                {/* {Object.entries(students).map(([id, stu]) => filter_Stu(stu)? <Col key = {id}    xs={12} sm={12} md={6} lg={4} xl={3}><Student {...stu}/></Col>: '')} */}
                {Object.entries(paged_stu).map(([id, stu]) => <Col key = {id}    xs={12} sm={12} md={6} lg={4} xl={3}><Student {...stu}/></Col>)}
            </Row>
        </Container>
        <Pagination>
            <Pagination.Prev onClick={() => setpage(cur_page -1)} disabled = {cur_page === 1 || filteredStudents.length === 0}/>
            {page().map(index => <Pagination.Item active={cur_page === index} onClick={() => {setpage(index)}}>{index}</Pagination.Item>)}
            <Pagination.Next onClick={() => setpage(cur_page + 1)} disabled = {cur_page === page().length ||filteredStudents.length === 0}/>
        </Pagination>
    </div>

}

export default Classroom;