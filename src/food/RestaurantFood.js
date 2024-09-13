//Function to get the information of the food

function getFoodInfo(foodsArray, id)
{
    let foodInfo = foodsArray.find(foods => foods.id === id);

    if (foodInfo === undefined)
    {
        console.log("Food Information does not exist for ID: " + id);
        return undefined;
    }

    return foodInfo;
}

export { getFoodInfo};