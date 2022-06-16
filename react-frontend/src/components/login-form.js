import React, { useEffect, useState } from "react";
import {Button,Form} from 'react-bootstrap'
import validator from 'validator';
import { nodeBaseUrl, loginPath } from "../config";

const LoginForm = ({setIsAuthenticated,setUserDisplayName,setIsLoading}) => {
    console.log("Creating Login Form now")
    const [inputUsernameEmail,setInputUsernameEmail] = useState('')
    const [inputPassword,setInputPassword] = useState('')//is it safe to store passwords on a React state?

    const loginFunction = (e) => {
        e.preventDefault();
        setIsLoading(true)

        console.log("Logging In");

        // Construct the POST body
        var postData = {'password':inputPassword};
        if (validator.isEmail(inputUsernameEmail)){
            var formBody = encodeURIComponent(`email=${inputUsernameEmail}`) + "&" + encodeURIComponent(`password=${inputPassword}`);
        }
        else{
            var formBody = encodeURIComponent(`username=${inputUsernameEmail}`) + "&" + encodeURIComponent(`password=${inputPassword}`);
        }

        // Send POST request to Node
        fetch(`${nodeBaseUrl}${loginPath}`, {
            method: 'POST',
            headers:{"Content-Type":"application/json"},
            body: formBody
        })
        .then(async (res)=>{
            if(res.status == 200){
                // Just becase it's 200 doesn't mean it's all good. the jwtPayload has a 'success':true property within
                var resJson = res.json();
                return resJson;
            }
            throw new Error(`login attempt res.status=${res.status}`)

        })
        .then((resJson)=>{
            console.log(resJson)
            if(resJson.success == true){
                setIsAuthenticated(true)
                setUserDisplayName(resJson.userDisplayName)
                setIsLoading(false)
                if(resJson.jwt){
                    localStorage.setItem(
                        'radioWesternWordpressAccessToken',
                        resJson.jwt
                    );
                }
                if(resJson.userLogin){
                    localStorage.setItem(
                        'radioWesternWordpressUserLogin',
                        resJson.userLogin
                    );
                }
                if(resJson.userPass){
                    localStorage.setItem(
                        'radioWesternWordpressUserPass',
                        resJson.userPass
                    );
                }
            }
            else{
                setIsLoading(false)
                setIsAuthenticated(false)
                setUserDisplayName('')
                alert(`ERROR 
                ${resJson.wpStatusCode} 
                (${resJson.wpStatusMessage}) : 
                ${resJson.wpPayloadMessage}
                ${resJson.errorDetails}`)
            }
        })
        .catch((err) => {
            console.log("err",err);
        });
    }
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicUsernameEmail">
                <Form.Label>Username/email</Form.Label>
                <Form.Control type="email" placeholder="Enter username or email" value = {inputUsernameEmail} onChange={(e) => setInputUsernameEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value = {inputPassword}  onChange={(e) => setInputPassword(e.target.value)}/>
            </Form.Group>

            <Button variant='success' onClick={loginFunction}>Log Me in</Button>
        </Form>
    )
}

export default LoginForm;