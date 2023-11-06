import { observer } from "mobx-react";
import { toJS } from "mobx";
import React from "react";
import { useEffect, useState } from "react";
import filteredDataStore from "../../store/FilteredDataStore.js";
import "./Sort.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faAngleUp } from '@fortawesome/free-solid-svg-icons';




const SortBlock = () => {
    const [sortType, setSortType] = useState<string>();
    const [sortDirection, setSortDirection] = useState<string>();




    useEffect(() => {
        filteredDataStore.sortData(sortType, sortDirection);
    }, [sortType, sortDirection]);



    return (
        <>
            <div className="sortBlock">
                <div className="sort_criteria">
                    <p
                        className={`sort_price_button ${sortType === "price" ? "active" : ""}`}
                        onClick={() => setSortType("price")}
                    >
                        Sort by price
                    </p>
                    <p
                        className={`sort_rating_button ${sortType === "rating" ? "active" : ""}`}
                        onClick={() => setSortType("rating")}
                    >
                        Sort by rating
                    </p>
                </div>
                <div className="sort_dynamic">
                    <FontAwesomeIcon
                        icon={faAngleUp}
                        size="xl"
                        className={`sort_up_button ${sortDirection === "up" ? "active" : ""}`}
                        onClick={() => setSortDirection("up")}
                    />

                    <FontAwesomeIcon
                        icon={faAngleUp}
                        rotation={180}
                        size="xl"
                        className={`sort_down_button ${sortDirection === "down" ? "active" : ""}`}
                        onClick={() => setSortDirection("down")}
                    />
                </div>
            </div>
        </>
    );

};

export default observer(SortBlock);