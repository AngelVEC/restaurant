import Button from 'react-bootstrap/Button';
import { CartContext } from './Cart';
import { useContext } from 'react';
import { getFoodInfo } from '../food/RestaurantFood';

function CartFoods(props)
{
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const foodData = props.foodData;
    const foodInfo = getFoodInfo(foodData,id);
    
    return (
        <>
            <h3>{quantity}x {foodInfo.foodName}</h3>
            <p>${(quantity * foodInfo.price).toFixed(2)} </p>
            <Button size='sm' onClick={() => cart.removeAllFromCart(id)}>Remove</Button>
            <hr></hr>
        </>
    )
}

export default CartFoods;