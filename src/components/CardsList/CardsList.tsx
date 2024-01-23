import React, { useState, useEffect } from 'react';
import CardItem from '../CardItem/CardItem';
import useApiService from '../../services/ApiService';

interface Item {
  name: string;
  id: string;
  description: string;
  // Add other properties as needed
}

function CardsList() {
  const { loading, error, getAllItems } = useApiService();
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // You can adjust the number of items per page as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllItems();
        setItemList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function renderItemsList(arr: Item[]) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedItems = arr.slice(startIndex, endIndex);
    return (
      <ul className="cards-list">
        {slicedItems.map((item) => (
          <CardItem key={item.id} name={item.name} description={item.description} />
        ))}
      </ul>
    );
  }

  const totalPages = Math.ceil(itemList.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div>
      {renderItemsList(itemList)}
      <div className='cards-list__pagination'>
        <button className='cards-list__pagination_btn cards-list__pagination_prev' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
         
        </button>
        <span className='cards-list__pagination_count'> Page {currentPage} of {totalPages} </span>
        <button className='cards-list__pagination_btn cards-list__pagination_next' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        </button>
      </div>
    </div>
  );
}

export default CardsList;