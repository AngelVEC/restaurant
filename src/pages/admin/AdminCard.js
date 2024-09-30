import React from 'react';
import {Card, Button} from 'react-bootstrap';
import placeholderIMG from "../../public/placeholder.png"
import { Link } from 'react-router-dom';
import DeleteFood from './DeleteFood';

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
        <Link to = "/admin/editFood" state={{food}}>
          <Button variant='outline-primary' style={{marginRight: "10px"}}>Edit</Button>
        </Link>
        <Button variant='outline-danger' onClick={() => DeleteFood(food)}>Delete</Button>
      </Card.Body>
    </Card>
  )

}

export default AdminCard