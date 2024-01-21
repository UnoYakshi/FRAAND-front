import React, { useState, useEffect, useRef} from 'react';
import CardItem from "../CardItem/CardItem";
import useApiService from "../../services/ApiService";

interface Item {
    name: string,
    id: string,
    description: string
    // Add other properties as needed
  }

function CardsList() {
    const {loading, error, getAllItems} = useApiService();
    const [itemList, setItemList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
              const data = await getAllItems();
            //   console.log(data);
              setItemList(data); // Here, you can use the JSON data as needed
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
    }, [])
    console.log(itemList)
    function renderItemsList(arr:Item[]) {
        const items = arr.map((item, i) => {
            return(
                <CardItem key={item.id} name={item.name} description={item.description}/>
            )
        })

        return(
            <ul className="cards-list">
                {items}
            </ul> 
        )
    }

    const items = renderItemsList(itemList)
    return(
        <>
        {items}
        </>
    )
}

export default CardsList;