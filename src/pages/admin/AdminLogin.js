import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import sign from 'jwt-encode';

//import {jwtDecode} from 'jwt-decode';

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login_status, setLogin_Status] = useState("");

    function userNameHandler(e) {
        setUsername(e.target.value);
    }

    function passwordHandler(e) {
        setPassword(e.target.value);
    }

    function login()
    {
        const registerQuery =
        `
            query {
                adminCheck(username: "${username}", password: "${password}") 
            }
        `;

        // const test = process.env.REACT_APP_TESTING;
        // console.log(test);

        // const apiUrl = process.env.REACT_APP_API_URL;
        // console.log(apiUrl);
          
        let config = {
            method: 'post',
            url: process.env.REACT_APP_API_URL,
            data: 
            {
                query: registerQuery,
            }};
        
        axios.request(config)
            .then((response) => {
                //console.log(response.data.data);
                var replyFromAPI = response.data.data.adminCheck;
                //console.log (replyFromAPI);
                if (replyFromAPI === true)
                {
                    //grab the secret key from env
                    const jwtSecretKey = process.env.REACT_APP_SECRET_KEY;
                    
                    let dataForToken =
                    {
                        signInTime: Date.now(),
                        username,
                    }

                    const token = sign(dataForToken, jwtSecretKey);
                    //set the token to localstorage
                    localStorage.setItem('jwt-token-for-admin', token);
                    
                    window.location = "/admin";
                    //console.log(token);

                    //console.log(jwtDecode(token));
                }
                else
                {
                    setLogin_Status("Wrong Admin credentials");
                }
            })
            .catch((error) => {
                console.log(error);
                setLogin_Status("There is some error when trying to grab your request")
                
            });
    }

    return (
        <div>
        <Container>
            <Row className="justify-content-md-center">
                <Col></Col>
                <Col>
                    <h1>Admin Login</h1>
                    <p>Username: <input id={"username"} type={'text'} onChange={userNameHandler}/></p>
                    <p>Password: <input id={"password"} type={'password'} onChange={passwordHandler} /></p>
                    <p><button id={"loginbtn"} onClick={login}>Login</button></p>
                    <p id={'login_status'}>{login_status}</p>
                </Col>
                <Col></Col>
            </Row>
        </Container>
        </div>
    );
}

export default AdminLogin;