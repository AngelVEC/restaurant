import {Button, Container, Navbar, Modal} from 'react-bootstrap'
import { useContext, useState } from 'react';
import { CartContext } from './Cart';
import CartFoods from './CartFoods';

function NavbarComponent()
{
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const foodsCount = cart.items.reduce((sum, foods) => sum + foods.quantity, 0);

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">MyRestaurant</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse className='justify-content-end'>
                    <Button onClick={handleShow}>Cart ({foodsCount} items) </Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {foodsCount > 0
                    ?
                        <>
                            <p>Items in your cart: </p>
                            {
                                cart.items.map((foodsInCart, idx) =>
                                (
                                    <CartFoods key={idx} id={foodsInCart.id} quantity={foodsInCart.quantity}/>
                                ))
                            }

                            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                            <Button variant="success">
                                Purchase Items!
                            </Button>
                        </>
                    :
                        <h1>There is no items in the cart</h1>
                    }
                 </Modal.Body>
            </Modal>
        </>
    )
}

export default NavbarComponent;