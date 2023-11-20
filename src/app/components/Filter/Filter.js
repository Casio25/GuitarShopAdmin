"use client"
import { observer } from "mobx-react";
import { flowResult, toJS } from "mobx";
import { useState, useEffect } from "react";
import { offers } from "../FakeData.js";
import filteredDataStore from "../../store/FilteredDataStore";
import {queryString} from "../../store/filteredDataStore.js"
import LoginStore from "@/app/store/LoginStore.js";
import * as variables from "../variables.js";
import "./Filter.css"
import React from "react";
import { Stack, TextField, Checkbox, Slider, Button } from "@mui/material"
import { fetchData } from '../../store/actions';
import { DataFetcher } from "../../store/FilteredDataStore.js";

const FilterBlock = () => {


    // old realtime fiter for uploaded data
    // useEffect(() => {
    //     const filtered = filteredDataStore.applyFilter(filteredDataStore.initialData);
    //     filteredDataStore.updateFilteredData(filtered);
    // }, [filteredDataStore.filterArray]);

    useEffect(() => {
        console.log(toJS(filteredDataStore.filterArray));
        console.log(toJS(filteredDataStore.currentProductList))
    }, [filteredDataStore.currentProductList]);


    const [sliderValue, setSliderValue] = useState(100)

    useEffect(() => {
        filteredDataStore.take = sliderValue
    }, [sliderValue])

    const handleSliderChange = (event, newValue) => {
        const singleValue = Array.isArray(newValue) ? newValue[0] : newValue;
        setSliderValue(singleValue);
    }


    const confirmFilterChange = (event) => {

        const filtered = filteredDataStore.applyFilter(filteredDataStore.initialData);
        filteredDataStore.updateFilteredData(filtered);
        fetchData(filteredDataStore.take, queryString, LoginStore.jwtToken)
        console.log("jwt during confirm filter: ", LoginStore.jwtToken)

    }

    return (
        <>
            <div className="filterBlock">
                <h1>Фільтр</h1>
                <Button
                    className="confirm_filter"
                    variant="contained"
                    color="primary"
                    sx={{ mx: "50px" }}
                    onClick={confirmFilterChange}>
                    Confirm fliter
                </Button>
                <h5>Скільки товарів ви хочете завантажити?</h5>
                <Stack
                    className="product_range"
                    direction="row"
                    spacing={2}
                    sx={{ mr: '20px', ml: '20px', mb: '10px' }}
                >
                    <Slider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}`}
                        aria-labelledby="range-slider"
                    />
                </Stack>
                <Stack className="price_range" direction='row' spacing={2} sx={{ mr: '10px' }}>
                    <TextField
                        type="number"
                        className="min_price"
                        label="MinPrice"
                        InputLabelProps={{
                            sx: { marginTop: "-4px" },
                        }}
                        onChange={(e) => filteredDataStore.priceFilter(e, 'minPrice')}
                    />
                    <TextField
                        type="number"
                        className="max_price"
                        label="MaxPrice"
                        InputLabelProps={{
                            sx: { marginTop: "-4px" },
                        }}
                        onChange={(e) => filteredDataStore.priceFilter(e, 'maxPrice')}
                    />
                </Stack>
                <form className="filter_checkboxes">
                    <fieldset className="filter_values">
                        {variables.typeList.map((type, index) => (
                            <div key={index}>
                                <Checkbox
                                    name="guitar_type"
                                    value={type}
                                    id={`type_${type}`}
                                    checked={filteredDataStore.typeChecked[type]}
                                    onChange={(e) => filteredDataStore.stringAndTypeFilter(e, "type")}
                                />
                                <label htmlFor={`type_${type}`}>{variables.HTMLTypeList[index]}</label>
                            </div>
                        ))}
                    </fieldset>
                    <fieldset className="filter_strings">
                        <div>
                            <Checkbox
                                name="guitar_strings"
                                value="4"
                                id="strings_4"
                                disabled={filteredDataStore.checkboxDisabled("4")}
                                onChange={(e) => filteredDataStore.stringAndTypeFilter(e, "string")}
                            />
                            <label htmlFor="strings_4">4</label>
                        </div>
                        <div>
                            <Checkbox
                                name="guitar_strings"
                                value="6"
                                id="strings_6"
                                disabled={filteredDataStore.checkboxDisabled("6")}
                                onChange={(e) => filteredDataStore.stringAndTypeFilter(e, "string")}
                            />
                            <label htmlFor="strings_6">6</label>
                        </div>
                        <div>
                            <Checkbox
                                name="guitar_strings"
                                value="7"
                                id="strings_7"
                                disabled={filteredDataStore.checkboxDisabled("7")}
                                onChange={(e) => filteredDataStore.stringAndTypeFilter(e, "string")}
                            />
                            <label htmlFor="strings_7">7</label>
                        </div>
                        <div>
                            <Checkbox
                                name="guitar_strings"
                                value="12"
                                id="strings_12"
                                disabled={filteredDataStore.checkboxDisabled("12")}
                                onChange={(e) => filteredDataStore.stringAndTypeFilter(e, "string")}
                            />
                            <label htmlFor="strings_12">12</label>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    );
};

export default observer(FilterBlock);