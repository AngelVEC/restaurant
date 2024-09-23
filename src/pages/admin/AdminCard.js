import React from 'react';
import {Card, Button, Form, Row, Col} from 'react-bootstrap';
import placeholderIMG from "../../public/placeholder.png"

function AdminCard(props) {
  const food = props.food;
  const foodName = food.foodName;
  const foodPrice = food.price.toFixed(2);
  // to print what object in the cart
  // console.log(cart.items);

  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" src={placeholderIMG}/>
        <Card.Title>{(foodName)}</Card.Title>
        <Card.Text>${foodPrice}</Card.Text>
        <Button variant='outline-primary' style={{marginRight: "10px"}}>Edit</Button>
        <Button variant='outline-danger'>Delete</Button>
      </Card.Body>
    </Card>
  )

}

export default AdminCard