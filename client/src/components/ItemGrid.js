import React, { useEffect, useState } from "react";
import Item from "./Item";
const ItemGrid = () => {
  const [items, setItems] = useState(null);
  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data.data);
      });
  }, []);

  return (
    <>
      {items && (
        <ul>
          {items.map((item) => {
            return (
              <>
                <Item
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  imageSrc={item.imageSrc}
                />
              </>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ItemGrid;
