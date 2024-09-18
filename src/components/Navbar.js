import {Button, Navbar, Modal, Nav} from 'react-bootstrap'
import { useContext, useState } from 'react';
import { CartContext } from './Cart';
import CartFoods from './CartFoods';
import FetchFood from '../food/FetchFood';
import {jwtDecode} from 'jwt-decode';

function NavbarComponent()
{
    //Fetcing the foodData
    const foodData = FetchFood();

    const token = localStorage.getItem('jwt-token');

    //console.log(jwtDecode(token).username)

    //Initialize the cart
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
                {
                    //When token is equal null, will print the register and login
                    token === null
                    ?
                        <>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/register">Register</Nav.Link>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </>
                    :
                    //but when jwt token found
                    <>
                        <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/logout">Logout({jwtDecode(token).username})</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                    </>
                }

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
                                    <CartFoods key={idx} id={foodsInCart.id} quantity={foodsInCart.quantity} foodData={foodData}/>
                                ))
                            }

                            <h1>Total: ${cart.getTotalCost(foodData).toFixed(2)} ({foodsCount} items)</h1>

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