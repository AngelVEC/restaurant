import { useState,useEffect } from 'react';
import axios from 'axios';

//Fetching the food from .net API
function FetchFood(){
    const [foodsTest, setFoodsTest] = useState([]);

    useEffect(() => {
        const queryTest =
        `
            query Allfoods {
                allfoods {
                    id
                    foodName
                    price
                }
            }
        `;
        
        let config = {
            method: 'post',
            url: process.env.REACT_APP_API_URL,
            data: 
            {
                query: queryTest
            }};
            
        
            axios.request(config)
            .then((response) => {
            setFoodsTest(response.data.data.allfoods);
            });
        
    },[]);

    return foodsTest;
}

export default FetchFood;