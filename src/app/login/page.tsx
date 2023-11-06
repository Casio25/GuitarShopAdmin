'use client'
import { useState } from 'react';
import { observer } from "mobx-react-lite";
import  { ILogin } from "../utils/interface/ILogin"
import  LoginStore from "../store/LoginStore.js"
// import {postLogin} from "../Actions/LoginAction"
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const postLogin = (data: ILogin) => {
        fetch("http://localhost:4000/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json(); // Parse response as JSON
        })
            .then(function (json) {
                if (json.access_token) {
                    LoginStore.setJwtToken(json.access_token); // Set the jwtToken property
                    LoginStore.setLoginEmail(data.email); // set the Email
                    LoginStore.setLoginPassword(data.password);
                    console.log(`store  data ${LoginStore.jwtToken}`);
                    console.log(`store email ${LoginStore.email}`)
                }
                console.log(json.error)
                switch (json.error) {
                    case "Bad Request":
                        console.log("You forgot to add password");
                        break;
                    case "Wrong password":
                        console.log("Wrong password");
                        break;
                    case "User with this email doesn't exist":
                        console.log("User with this email doesn't exist");
                        break;
                    default:
                        break;
                }

            })
            .catch(function (error) {
                console.error("Error:", error);
            });

    }


    const handleLogin = () => {
        const backendLogin = {
            email: email,
            password: password,

        }
        postLogin(backendLogin)
        console.log(backendLogin)
       
        console.log('Email:', email);
        console.log('Password:', password);
    }
    return (
        <>
            <div>
                <h1>Login Page</h1>
                <form>
                    <label>Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <br />
                    <label>Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <br />
                    <button type="button" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </>
    )
}

export default observer(Login)
