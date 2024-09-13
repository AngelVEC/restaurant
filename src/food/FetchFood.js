import { useState,useEffect } from 'react';
import axios from 'axios';

//Fetching the food from .net API
function FetchFood(){
    const [foodsTest, setFoodsTest] = useState([]);
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

    useEffect(() => {
        let config = {
            method: 'post',
            url: "http://localhost:5246/graphql/",
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