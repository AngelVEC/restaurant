import React from 'react';
import {Row, Col, Modal, Button} from 'react-bootstrap';
import AdminCard from './AdminCard';
import FetchFood from '../../food/FetchFood';
import { useState } from 'react';
import axios from 'axios';

//import {jwtDecode} from 'jwt-decode';

function AdminDashboard() {
    const data = FetchFood();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [foodName, setFoodName] = useState("");
    const [price, setPrice] = useState("");

    const adminToken = localStorage.getItem('jwt-token-for-admin');

    function foodNameHandler(e) {
        setFoodName(e.target.value);
    }

    function priceHandler(e) {
        setPrice(e.target.value);
    }

    function addNewFood()
    {
        const addFoodQuery =
        `
            mutation {
            createFood(foodname: "${foodName}", price: ${price}) 
            }
        `;

        // const test = process.env.REACT_APP_TESTING;
        // console.log(test);

        // const apiUrl = process.env.REACT_APP_API_URL;
        // console.log(apiUrl);
         
        let config = {
            method: 'post',
            url: process.env.REACT_APP_API_URL,
            data: 
            {
                query: addFoodQuery,
            }};
        
        axios.request(config)
            .then(() => {
                window.location = "/admin";
            })
            .catch((error) => {
                console.log(error);                
            });
    }

    if(!adminToken)
    {
        window.location.replace("/")
    }

    return (
      <>
        <h1 align="center" className='p-3'>MyRestaurant Admin Page</h1>

        <Row style={{marginBottom:"15px"}}>
            <Col md={{ span: 4, offset: 10 }}>
                <Button onClick={handleShow}>Add Foods</Button>
                <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Food</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col md={{ span: 3, offset: 0 }}><p style={{textAlign:'right'}}>Food Name</p></Col>
                                <Col><input id={"foodName"} type={'text'} onChange={foodNameHandler} /></Col>
                            </Row>
                            <Row>
                                <Col md={{ span: 3, offset: 0 }}><p style={{textAlign:'right'}}>Price </p></Col>
                                <Col><input id={"price"} type={'text'} onChange={priceHandler} /></Col>
                            </Row>
                            <Button variant="success" onClick={addNewFood}>Add new Food!</Button>
                        </Modal.Body>
                </Modal>
            </Col>
        </Row>

        <Row xs={1} md={3} className="g-4">
          {data.map((foods, idx) => (
            <Col align="center" key={idx}>
              <AdminCard food= {foods}/>
            </Col>
          ))}
   
        </Row>
      </>
    )
    
}

export default AdminDashboard;