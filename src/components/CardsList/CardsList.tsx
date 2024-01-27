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
  const [itemsCount, setItemsCount] = useState(4);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getAllItems(itemsCount);
      setItemList(data);
      if(data.length === itemList.length) {
        setHasMoreItems(false);
      }
      console.log(hasMoreItems)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMore = () => {
    setItemsCount((count) => count + 4);
  }

  useEffect(() => {
    fetchData();
  }, [itemsCount])

  function renderItemsList(arr: Item[]) {
    return (
      <ul className="cards-list">
        {arr.map((item) => (
          <CardItem key={item.id} name={item.name} description={item.description} />
        ))}
      </ul>
    );
  }


  return (
    <div>
      {renderItemsList(itemList)}
      <div className='cards-list__pagination'>
        <button className='cards-list__more' onClick={handleMore} disabled={loading || !hasMoreItems}>{loading ? 'Loading...' : 'Load more'}</button>
      </div>
    </div>
  );
}

export default CardsList;