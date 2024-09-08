

const foodsArray = [
    {
        id: "1",
        title: "Coffee",
        price: 4.99
    },
    {
        id: "2",
        title: "Fried Rice",
        price: 10.99
    },
    {
        id: "3",
        title: "Wanton",
        price: 10.99
    }
]

function getFoodInfo(id)
{
    let foodInfo = foodsArray.find(foods => foods.id === id);

    if (foodInfo === undefined)
    {
        console.log("Food Information does not exist for ID: " + id);
        return undefined;
    }

    return foodInfo;
}

export { foodsArray, getFoodInfo};