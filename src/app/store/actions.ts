
import { IQueryParams } from './../utils/interface/IQueryParams';

import { ILoginStore } from '../utils/interface/ILogin';
import LoginStore from './LoginStore';

import filteredDataStore from './FilteredDataStore'; 

export const fetchData = async () => {
    try {
        const queryParams = <IQueryParams>{};

        if (filteredDataStore.filterArray.type.length > 0) {
            queryParams.type = filteredDataStore.filterArray.type.join(',');
        }
        if (filteredDataStore.filterArray.string.length > 0) {
            queryParams.string = filteredDataStore.filterArray.string.join(',');
        }
        if (
            filteredDataStore.filterArray.price.minPrice !== undefined ||
            filteredDataStore.filterArray.price.maxPrice !== undefined
        ) {
            queryParams.price = JSON.stringify({
                minPrice: filteredDataStore.filterArray.price.minPrice,
                maxPrice: filteredDataStore.filterArray.price.maxPrice,
            });
        }

        const queryString = Object.keys(queryParams)
            .map((key) => `${key}=${queryParams[key]}`)
            .join('&');
        console.log("jwt during fetch", LoginStore.jwtToken)

        const url = `http://localhost:4000/catalog?skip=0&take=${filteredDataStore.take}&${queryString}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${LoginStore.jwtToken}`, 
            },
        });

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to handle it elsewhere if needed
    }
}