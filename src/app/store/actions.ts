"use server"
import { cookies } from 'next/headers';
import { IQueryParams } from './../utils/interface/IQueryParams';
import { ILoginStore } from '../utils/interface/ILogin';

import {IFilteredDataStore} from "../utils/interface/IFilteredDataStore"


export const fetchData = async (filteredData: number, queryString: any, LoginToken: string) => {
    try {
        console.log("tokein in action: ", LoginToken)
        const token = cookies().get("loginData")
        console.log("roken from cookies:", token?.value)
        const tokenValue = (token?.value || "").replace(/\s/g, '');
        const url = `http://localhost:4000/catalog?skip=0&take=${filteredData}&${queryString}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${tokenValue}`, 
            },
        });

        const responseData = await response.json();
        console.log(responseData.length)
        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}