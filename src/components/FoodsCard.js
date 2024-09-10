import React from 'react';
import {Card, Button, Form, Row, Col} from 'react-bootstrap';
import { CartContext } from './Cart';
import { useContext } from 'react';
import placeholderIMG from "../public/placeholder.png"

function FoodsCard(props) {
  const food = props.food;
  const cart = useContext(CartContext);
  const foodQuantity = cart.getQuantity(food.id);
  // to print what object in the cart
  // console.log(cart.items);

  return (
    <Card>
      <Card.Body>
        <Card.Img variant="top" src={placeholderIMG}/>
        <Card.Title>{food.title}</Card.Title>
        <Card.Text>${food.price}</Card.Text>
        { foodQuantity > 0 
          ?
            <>
              <Form as={Row}>
                <Form.Label column="true" sm="6">In Cart: {foodQuantity} </Form.Label>
                <Col sm="6">
                  <Button sm="6" onClick={() => cart.addOneToCart(food.id)} className='mx-2'>+</Button>
                  <Button sm="6" onClick={() => cart.removeOneFromCart(food.id)} className='mx-2'>-</Button>
                </Col>
              </Form>
              <Button variant="danger" onClick={() => cart.removeAllFromCart(food.id)} className='my-2'>Remove from cart</Button>
            
            </>
          :
          <Button variant='primary' onClick={() => cart.addOneToCart(food.id)}>Add To Cart</Button>
        }
      </Card.Body>
    </Card>  
  )

}

export default FoodsCard