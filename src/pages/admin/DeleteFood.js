import axios from 'axios';

function DeleteFood(props) {
    const id = props.id;

    const deleteQuery = 
    `
    mutation {
    deleteFood(id: ${id}) 
    }
    `

    let config = {
        method: 'post',
        url: process.env.REACT_APP_API_URL,
        data: 
        {
            query: deleteQuery,
        }};
    
    axios.request(config)
        .then(() => {
            window.location.replace("/admin")
        })
        .catch((error) => {
            console.log(error);                        
        });
}

export default DeleteFood