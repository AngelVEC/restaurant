import React from 'react';
import axios from 'axios';
import { useState } from 'react';

function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login_status, setLogin_Status] = useState("");


    function userNameHandler(e) {
        setUsername(e.target.value);
    }

    function passwordHandler(e) {
        setPassword(e.target.value);
    }

    function register()
    {
        const registerQuery =
        `
            mutation {
                createUser(username: "${username}", password: "${password}") 
            }
        `;
        const registerVariable =
        {
            "username": username,
            "password": password,
        }

        console.log(registerVariable);

        let config = {
            method: 'post',
            url: "http://localhost:5246/graphql/",
            data: 
            {
                query: registerQuery,
            }};
        
        axios.request(config)
            .then((response) => {
                //console.log(response.data.data.createUser);
                var replyFromAPI = response.data.data.createUser;
                if (replyFromAPI === false)
                {
                    setLogin_Status("Register Failed!, user might be exist")
                }
                else
                {
                    setLogin_Status("Register Success!");
                }
            })
            .catch((error) => {
                console.log(error);
                setLogin_Status("Register Failed!, user might be exist")

            });
    }

    return (
        <div>
            <h1>Register Page</h1>    
            <p>Username: <input id={"username"} type={'text'} onChange={userNameHandler}/></p>
            <p>Password: <input id={"password"} type={'password'} onChange={passwordHandler} /></p>
            <p><button id={"registerbtn"} onClick={register}>Register</button></p>
            <p id={'login_status'}>{login_status}</p>
        </div>
    );
}

export default Register;