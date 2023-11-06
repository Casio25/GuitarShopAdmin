import "./Pagination.css"
import React from "react";

interface IPages {
    totalPages: number;
    currentPage: number;
    goToPage: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, goToPage }: IPages) => {
    const maxDisplayedPages = 5; // Maximum number of pages to display excluding ellipsis

    // Calculate the range of page numbers to display
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

    // Adjust the startPage and endPage if there are fewer pages than maxDisplayedPages
    if (endPage - startPage + 1 < maxDisplayedPages) {
        startPage = Math.max(1, endPage - maxDisplayedPages + 1);
    }

    const pages = [];

    // Add the previous page button
    if (currentPage > 1) {
        pages.push(
            <button key="prev" className="pagination_button" onClick={() => goToPage(currentPage - 1)}>
                &lt;
            </button>
        );
    }

    // Add the ellipsis if necessary
    if (startPage > 1) {
        pages.push(<button key="ellipsis1" className="pagination_ellipsis">...</button>);
    }

    // Add the page buttons
    for (let page = startPage; page <= endPage; page++) {
        pages.push(
            <button
                key={page}
                className={`pagination_button ${currentPage === page ? "active" : ""}`}
                onClick={() => goToPage(page)}
            >
                {page}
            </button>
        );
    }

    // Add the ellipsis if necessary
    if (endPage < totalPages) {
        pages.push(<button key="ellipsis2" className="pagination_ellipsis">...</button>);
    }

    // Add the next page button
    if (currentPage < totalPages) {
        pages.push(
            <button
                key="next"
                className="pagination_button"
                onClick={() => goToPage(currentPage + 1)}
            >
                &gt;
            </button>
        );
    }

    return <div className="pagination">{pages}</div>;
};

export default Pagination;