import React, { useState, useEffect, useCallback } from "react";
import CardItem from "../CardItem/CardItem";
import useApiService from "../../services/ApiService";
import arrow from "../../img/arrow.svg";

interface Item {
  name: string;
  id: string;
  description: string;
}

function CardsList() {
  const paginationOffset = 4;
  const visiblePageCount: number = 5;
  const { loading, error, getItemsWithPagination, getAllItemsLength } =
    useApiService();
  const [itemList, setItemList] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [pageCount, setPageCount] = useState<number>(0);

  // Fetch elements per page
  const fetchData = useCallback(
    async (page: number) => {
      try {
        const data: Item[] = await getItemsWithPagination(
          paginationOffset,
          page * paginationOffset
        );
        setItemList(data);
        setHasMoreItems(data.length === paginationOffset);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    },
    [getItemsWithPagination, paginationOffset]
  );

  // Fetch number of all items to count number of pages
  const fetchPageCount = async () => {
    try {
      const itemsCount: number = await getAllItemsLength();
      setPageCount(Math.ceil(itemsCount / paginationOffset));
    } catch (error) {
      console.error("Error fetching page count:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
    fetchPageCount();
  }, []);

  const handleNextPage = () => {
    if (hasMoreItems) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Render items for a page
  function renderItemsList(arr: Item[]) {
    return (
      <ul className="cards-list">
        {arr.map((item) => (
          <CardItem
            key={item.id}
            name={item.name}
            description={item.description}
          />
        ))}
      </ul>
    );
  }

  // Render buttons for all pages
  function renderPageBtns() {
    const pages = [];
    const startPage = Math.max(
      0,
      Math.min(
        currentPage - Math.floor(visiblePageCount / 2),
        pageCount - visiblePageCount
      )
    );
    const endPage = Math.min(pageCount, startPage + visiblePageCount);

    if (startPage > 0) {
      pages.push(
        <button
          key={0}
          className="cards-list__page_btn"
          onClick={() => handlePageClick(0)}
        >
          1
        </button>
      );
      if (startPage > 1) {
        pages.push(
          <span key="start-ellipsis" className="cards-list__ellipsis">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i < endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`cards-list__page_btn ${
            currentPage === i ? "active" : ""
          }`}
          disabled={currentPage === i}
          onClick={() => handlePageClick(i)}
        >
          {i + 1}
        </button>
      );
    }

    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        pages.push(
          <span key="end-ellipsis" className="cards-list__ellipsis">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={pageCount - 1}
          className="cards-list__page_btn"
          onClick={() => handlePageClick(pageCount - 1)}
        >
          {pageCount}
        </button>
      );
    }

    return pages;
  }

  return (
    <div>
      {renderItemsList(itemList)}
      <div className="cards-list__pagination">
        <button
          className="cards-list__arrow"
          onClick={handlePrevPage}
          disabled={loading || currentPage === 0}
        >
          <img
            className="cards-list__arrow_img cards-list__arrow_img_prev"
            src={arrow}
            alt="go to the previous page"
          />
        </button>
        {renderPageBtns()}
        <button
          className="cards-list__arrow"
          onClick={handleNextPage}
          disabled={loading || !hasMoreItems}
        >
          <img
            className="cards-list__arrow_img"
            src={arrow}
            alt="go to the next page"
          />
        </button>
      </div>
    </div>
  );
}

export default CardsList;
