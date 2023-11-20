"use client"
import { observable } from "mobx";

const LoginStore = observable({
    jwtToken: "",
    email: "",
    password: "",
    orders: [],

    setJwtToken(token) {
        this.jwtToken = token;
    },
    setLoginEmail(email) {
        this.email = email;
    },
    setLoginPassword(password) {
        this.password = password;
    },
    setLoginOrders(orders) {
        this.orders = orders;
    },

    saveToLocalStorage(data) {
        localStorage.setItem("loginData", JSON.stringify(data));
    },
});

export default LoginStore;
