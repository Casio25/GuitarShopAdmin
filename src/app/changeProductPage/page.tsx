'use client'
import React, { useState, useEffect } from "react";
import { Button, FormControlLabel, FormGroup, Stack, TextField, Checkbox } from '@mui/material'
import ChangeProductStore from "../store/changedProductStore";
import { observer } from "mobx-react";
import LoginStore from "../store/LoginStore.js"
import {changeProduct} from "./action"


interface IProductData {
    id: number | null;
    productName: string;
    photo: string;
    price: number | null;
    type: string;
    string: string;
    [key: string]: string | number | null; // Index signature
}
interface IChangeHandler {
    target: IStringAndNumberTarget
}
interface IStringAndNumberTarget {
    name: string
    value: string
}

//type and string interface
interface ITypeChanger {
    target: ITypeTarget
}
interface ITypeTarget {
    name: string,
    checked: boolean,
    disabled: boolean
}

interface GuitarType {
    ukulele: boolean;
    electro: boolean;
    acustic: boolean;
    [key: string]: boolean; // Index signature
}

const ChangeProductPage = () => {
    const [productData, setProductData] = useState<IProductData>({
        id: ChangeProductStore.id,
        productName: "",
        photo: "",
        price: null,
        type: "",
        string: ""
    })
    const changeHandler = (e: IChangeHandler) => {
        const { name, value } = e.target
        const numericValue = name === "price" ? parseFloat(value) : value
        setProductData({ ...productData, [name]: numericValue })
    }



    // Type Chnger
    const [type, setType] = useState<GuitarType>({
        ukulele: false,
        electro: false,
        acustic: false
    })

    const [string, setString] = useState({
        four: false,
        six: false,
        seven: false,
        twelve: false

    })
    const stringOptions: Record<string, string[]> = {
        ukulele: ["4"],
        acustic: ["6", "7", "12"],
        electro: ["4", "6", "7"],
    };

    const changeType = (e: ITypeChanger) => {
        const { name, checked } = e.target
        setType({
            ukulele: name === "ukulele" ? checked : false,
            electro: name === "electro" ? checked : false,
            acustic: name === "acustic" ? checked : false
        })
        setString({
            four: false,
            six: false,
            seven: false,
            twelve: false
        })
        setProductData((prevData) => ({
            ...prevData,
            string: "",
            type: name
        }));

        // Update the photo based on the latest type state
        switch (name) {
            case "ukulele":
                setProductData((prevData) => ({ ...prevData, photo: "ukulele.png" }));
                break;
            case "electro":
                setProductData((prevData) => ({ ...prevData, photo: "electro.png" }));
                break;
            case "acustic":
                setProductData((prevData) => ({ ...prevData, photo: "acustic.png" }));
                break;
            default:
                break;
        }
    }
    const { ukulele, electro, acustic } = type;


    const changeString = (e: ITypeChanger) => {
        const { name, checked, disabled } = e.target
        setString({
            four: name === "4" ? checked : false,
            six: name === "6" ? checked : false,
            seven: name === "7" ? checked : false,
            twelve: name === "12" ? checked : false
        })
        setProductData({ ...productData, string: name })
    }

    const { four, six, seven, twelve } = string

    const checkboxDisabled = (value: any) => {
        const selectedGuitarTypes = Object.keys(type).filter(
            (guitarType) => type[guitarType]
        );

        if (!selectedGuitarTypes.length) {
            return false;
        }

        let isValueAvailable = false;

        for (const guitarType of selectedGuitarTypes) {
            if (stringOptions[guitarType].includes(value)) {
                isValueAvailable = true;
                break;
            }
        }
        return !isValueAvailable;
    };




    //Our final change
    const confirmChange = () => {
        const updatedProductData: IProductData = {
            id: ChangeProductStore.id,
            authorId: ChangeProductStore.authorId,
            productName: "",
            photo: "",
            price: null,
            type: "",
            string: ""
        };

        for (const key in productData) {
            if (Object.prototype.hasOwnProperty.call(productData, key)) {
                updatedProductData[key] = productData[key] !== "" && productData[key] !== null
                    ? productData[key]
                    : ChangeProductStore[key];
            }
        }

        setProductData(updatedProductData);
        console.log(updatedProductData);
        changeProduct(updatedProductData, LoginStore)
    };

    return (
        <div className="change_product_name">
            <Stack className="textfiled_changes">
                <p>Назва товару: {ChangeProductStore.productName}</p>
                <TextField
                    type="string"
                    name="productName"
                    onChange={changeHandler}
                />
                <p>Price: {ChangeProductStore.price}</p>
                <TextField
                    type="number"
                    name="price"
                    onChange={changeHandler} />
            </Stack>
            <Stack className="checkbox_changes" sx={{ mx: "50px" }}>
                <p>Type: {ChangeProductStore.type}</p>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={ukulele} onChange={changeType} name="ukulele" />}
                        label="ukulele"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={electro} onChange={changeType} name="electro" />}
                        label="electro"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={acustic} onChange={changeType} name="acustic" />}
                        label="acustic"
                    />
                </FormGroup>
                <p>String: {ChangeProductStore.string}</p>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={four} disabled={checkboxDisabled("4")} onChange={changeString} name="4" />}
                        label="4"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={six} disabled={checkboxDisabled("6")} onChange={changeString} name="6" />}
                        label="6"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={seven} disabled={checkboxDisabled("7")} onChange={changeString} name="7" />}
                        label="7"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={twelve} disabled={checkboxDisabled("12")} onChange={changeString} name="12" />}
                        label="12"
                    />
                </FormGroup>
            </Stack>
            <Button onClick={() => { confirmChange() }}>Confirm Change</Button>
        </div>
    )
}
export default observer(ChangeProductPage)