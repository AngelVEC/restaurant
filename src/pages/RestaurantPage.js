import React from 'react'
import {Row, Col} from 'react-bootstrap';

import FoodsCard from '../components/FoodsCard';
import FetchFood from '../food/FetchFood';


function Restaurant() {
  //Fetching the food data, and pass it to FoodsCard parameter later
  
  const data = FetchFood();
  return (
    <>
      <h1 align="center" className='p-3'>Welcome to the MyRestaurant</h1>
      <Row xs={1} md={3} className="g-4">
        {data.map((foods, idx) => (
          <Col align="center" key={idx}>
            <FoodsCard food= {foods}/>
          </Col>
        ))}
 
      </Row>
    </>
  )
}

export default Restaurant;