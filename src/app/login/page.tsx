'use client'
import { useState } from 'react';
import { observer, useObserver } from "mobx-react";
import  { ILogin } from "../utils/interface/ILogin"
import  LoginStore from "../store/LoginStore.js"
import {postLogin} from "./action"
function Login() {
    return useObserver (() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


  


    const handleLogin = async() => {
        try {
            const backendLogin = {
                email: email,
                password: password,

            }
            const result = await postLogin(backendLogin)
            LoginStore.setJwtToken(result)
            console.log("token after login: ", LoginStore.jwtToken)
        }catch(error){
            console.error(error)
        }
        
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
})
}


export default observer(Login)
