import React, { useState, useEffect } from "react";
import CardItem from "../CardItem/CardItem";
import useApiService from "../../services/ApiService";

interface Item {
  name: string;
  id: string;
  description: string;
}

function CardsList() {
  const paginationOffset = 4;
  const { loading, error, getItemsWithPagination } = useApiService();
  const [itemList, setItemList] = useState<Item[]>([]);
  const [itemsCount, setItemsCount] = useState(paginationOffset);
  const [itemsSkip, setItemsSkip] = useState(0);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  const fetchData = async () => {
    try {
      let data: Item[];
      if (itemsSkip === 0) {
        data = await getItemsWithPagination(paginationOffset, 0);
        setItemList(data);
      } else {
        data = await getItemsWithPagination(paginationOffset, itemsSkip);
        setItemList((prevItemList) => [...prevItemList, ...data]);
      }
      if (data.length < paginationOffset) {
        setHasMoreItems(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMore = () => {
    setItemsCount((count) => count + paginationOffset);
    setItemsSkip((count) => count + paginationOffset);
  };

  useEffect(() => {
    fetchData();
  }, [itemsCount]);

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

  return (
    <div>
      {renderItemsList(itemList)}
      <div className="cards-list__pagination">
        <button
          className="cards-list__more"
          onClick={handleMore}
          disabled={loading || !hasMoreItems}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      </div>
    </div>
  );
}

export default CardsList;
