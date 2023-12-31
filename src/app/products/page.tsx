"use client"
import { toJS } from "mobx";
import { observer } from "mobx-react";
import React, { useState } from "react";
import FilterBlock from "../components/Filter/Filter";
import filteredDataStore from "../store/FilteredDataStore";
// import ShoppingCartStore from "../store/ShoppingCartStore.js";
import SortBlock from "../components/Sort/Sort";
import "./Catalog.css";
// import Modal from "../../components/MoreInfo/MoreInfo";
import { cardsPerPage, numberOfOffers, startPage } from "../components/variables.js";
import Pagination from "../components/Pagination/Pagination";
import acustic from "../assets/images/acustic.png";
import electro from "../assets/images/electro.png";
import ukulele from "../assets/images/ukulele.png";
import { Button, Stack } from '@mui/material'
import Link from 'next/link'
import { ICatalogData } from "../utils/interface/ICatalogData";
import Image from 'next/image'



const AllProducts :React.FC<{ data: ICatalogData[] }> = ({ data }) => {
    

        const [isModalOpen, setIsModalOpen] = useState(false);
        const [selectedProduct, setSelectedProduct] = useState({
            productName: "",
            photo: "",
            comments: [], // Add the 'comments' property
            rating: null,
            string: "",
        });
        const [currentPage, setCurrentPage] = useState(startPage);


    function imageSrc(data: string) {
        switch (data) {
            case "acustic.png":
                return acustic;
            case "ukulele.png":
                return ukulele;
            case "electro.png":
                return electro;
            default:
                return "";
        }
    }
        const indexOfLastCard = currentPage * cardsPerPage;
        const indexOfFirstCard = indexOfLastCard - cardsPerPage;
        const currentCards = toJS(filteredDataStore.currentProductList).slice(indexOfFirstCard, indexOfLastCard);

        const totalPages = Math.ceil(toJS(filteredDataStore.currentProductList).length / cardsPerPage);

        const goToPage = (pageNumber: number) => {
            setCurrentPage(pageNumber);
        };

        return (
            <>
                <SortBlock />
                <div className="container">
                    <div className="filter_block">
                        <FilterBlock />
                    </div>
                    <div className="guitar_catalog">
                        {currentCards.map((filteredData, index) => (
                            <div className="guitar_card" key={index}>
                                <Image className="guitar_image" src={imageSrc(filteredData.photo)} width={70} height={70} alt="photo" />
                                <p className="guitar_name">{filteredData.productName}</p>
                                <p className="guitar_price">{filteredData.price}</p>
                                <p className="guitar-rating">
                                    {Array.from({ length: filteredData.rating }, (_, index) => (
                                        <span className="star_rating" key={index}>
                                            &#9733;
                                        </span>
                                    ))}
                                </p>
                                <Stack className="guitar_buttons" direction='row'>
                                    <Link href="/changeProductPage">
                                        <Button className="button_change_product">Change Product</Button>
                                    </Link>
                                </Stack>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <Modal active={isModalOpen} setActive={setIsModalOpen} product={selectedProduct} /> */}
                <Pagination totalPages={totalPages} currentPage={currentPage} goToPage={goToPage} />
            </>
        );
}
export default observer(AllProducts);
