import { createContext, useState } from "react";
import { foodsArray, getFoodInfo } from "../food/RestaurantFood";

export const CartContext = createContext
({
    items: [],
    getQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    removeAllFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({children})
{
    const [cartProducts, setCartProducts] = useState([]);

    function getQuantity(id)
    {
        // ? is used in javascript, for example if there is no result from food id, it will throw "undefined"
        const quantity = cartProducts.find(food => food.id === id)?.quantity

        if (quantity === undefined)
        {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id)
    {
        const quantity = getQuantity(id);
        
        if (quantity === 0)
        {
            setCartProducts
            (
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        }
        else 
        {
            setCartProducts
            (
                //do a loop on the array, and check for the ID using mapping
                cartProducts.map
                (
                    food => food.id === id                        //if condition
                    ? {...food, quantity: food.quantity + 1}      //if statement is true
                    : food                                        //if statement is false
                ),
                //print the cart into the console log
                //console.log(cartProducts)
            )
        }
    }

    function removeOneFromCart(id)
    {
        const quantity = getQuantity(id);

        if (quantity === 1)
        {
            removeAllFromCart(id);
        }
        else
        {
            setCartProducts
            (
                //do a loop on the array, and check for the ID using mapping
                cartProducts.map
                (
                    food => food.id === id                        //if condition
                    ? {...food, quantity: food.quantity - 1}      //if statement is true
                    : food                                           //if statement is false
                )
            )
        }
    }

    function removeAllFromCart(id)
    {
        setCartProducts
        (
            cartProducts => cartProducts.filter(
                currentProduct =>
                {
                    return currentProduct.id !== id;
                }
            )
        )
    }

    function getTotalCost()
    {
        let totalCost = 0;
        cartProducts.map((cartItem) =>{
            const foodInfo = getFoodInfo(cartItem.id);
            totalCost += (foodInfo.price * cartItem.quantity);
        });
        return totalCost;

    }

    const contextValue = 
    {
        //pass the carproducts to the cart (items)
        items: cartProducts,
        getQuantity,
        addOneToCart,
        removeOneFromCart,
        removeAllFromCart,
        getTotalCost
    }

    return (
        <CartContext.Provider value = {contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;