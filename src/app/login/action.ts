"use server"
import { cookies } from 'next/headers';
import { ILoginStore } from './../utils/interface/ILogin';
import { ILogin } from "../utils/interface/ILogin"
import LoginStore from "../store/LoginStore"
import { observer } from "mobx-react";
import { runInAction } from 'mobx'; //allows us to use mobx stuff in async fucntions
import { json } from 'stream/consumers';
export const postLogin = async (data: ILogin) => {
    try {
        const response = await fetch("http://localhost:4000/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        if (json.access_token) {
            cookies().set("loginData", json.access_token)
            return json.access_token
        } else {
            console.log(json.error);
            switch (json.error) {
                case "Bad Request":
                    console.log("You forgot to add the password");
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
        }   
    } catch (error) {
        console.error("Error:", error);
    }
};

