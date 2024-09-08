import React from 'react';
import {Card, Button, Form, Row, Col} from 'react-bootstrap';

function FoodsCard(props) {
  const food = props.food;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{food.title}</Card.Title>
        <Card.Text>${food.price}</Card.Text>
        <Button variant='primary'>Add To Cart</Button>
      </Card.Body>
    </Card>  
  )
}

export default FoodsCard