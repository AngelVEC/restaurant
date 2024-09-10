import React from 'react'
import {Row, Col} from 'react-bootstrap';
import { foodsArray } from '../food/RestaurantFood';
import FoodsCard from '../components/FoodsCard';

function Restaurant() {
  return (
    <>
      <h1 align="center" className='p-3'>Welcome to the MyRestaurant</h1>
      <Row xs={1} md={3} className="g-4">
        {foodsArray.map((foods, idx) => (
          <Col align="center" key={idx}>
            <FoodsCard food= {foods}/>
          </Col>
        ))}
 
      </Row>
    </>
  )
}

export default Restaurant;