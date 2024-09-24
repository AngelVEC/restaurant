import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function EditFood() {
    var data = useLocation();
    const [foodName, setFoodName] = useState(()=> data.state != null ? data.state.food.foodName : "");
    const [foodPrice, setFoodPrice] = useState(()=> data.state != null ? data.state.food.price.toFixed(2) : "");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    //Handle when foodName change from input box
    function foodNameHandler(e) {
        setFoodName(e.target.value);
    }

    //handle when price change from input box
    function foodPriceHandler(e) {
        var value = e.target.value;

        //if its not a number
        if (isNaN(value))
        {
            setErrorMessage("please key in a number")
        }
        //if its a number
        else
        {
            //set back the error message, and set the value of foodPrice
            setErrorMessage("")   
            setFoodPrice(e.target.value);
        }
        //console.log(foodPrice);
    }

    // if nothing pased to the endpoint (incase someone directly trying to access this page)
    if (!data.state)
        {
            window.location = "/admin";
        }
    else
    {
        var food = data.state.food;    
        var foodId = food.id;

        function updateFood()
        {
            //if foodPrice or foodName is empty string
            if (foodPrice === "" || foodName === "")
            {
                setErrorMessage("Food Name or Price need to be filled")
            }
            else
            {
                setErrorMessage("")
                const updateQuery = 
                `
                mutation {
                updateFood(updatedFood: { foodName: "${foodName}", id: ${foodId}, price: ${foodPrice}}) 
                }
                `

                //console.log (updateQuery);

                let config = {
                    method: 'post',
                    url: process.env.REACT_APP_API_URL,
                    data: 
                    {
                        query: updateQuery,
                    }};
                
                axios.request(config)
                    .then(() => {
                        setSuccessMessage("Food with ID " + foodId + " got updated successfully, we will redirect you back to admin page");
                        setTimeout(function(){
                            window.location.replace("/admin")
                        }, 2000);
                    })
                    .catch((error) => {
                        console.log(error);                        
                    });
            }
        }

        return (
                    <>
                    <Container style={{marginTop:"60px"}}>
                        <Row>
                            <Col></Col>
                            <Col >
                                <Row>
                                    <Col><p style={{textAlign:'center'}}>Food Name</p></Col>
                                    <Col><input id={"foodName"} type={'text'} defaultValue={foodName} onChange={foodNameHandler}  /></Col>
                                </Row>
                                <Row>
                                    <Col><p style={{textAlign:'center'}}>Price</p></Col>
                                    <Col><input id={"price"} type={'text'} defaultValue={foodPrice} onChange={foodPriceHandler} /><p>{errorMessage}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p></p></Col>
                                    <Col></Col>
                                    <Col md={{ span: 3, offset: 0 }}>
                                        <button onClick={updateFood}>Update!</button>
                                    </Col>
                                    <p>{successMessage}</p>
                                </Row>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                    </>
                )

    }
}

export default EditFood