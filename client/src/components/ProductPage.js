import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Button from "./Button";
// import Cart from "./Cart";

const ProductPage = () => {
  const [item, setItem] = React.useState(null);
  let { id } = useParams();

  React.useEffect(() => {
    fetch(`/item/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
        console.log(data.data);
      });
  }, [id]);

  return (
    <>
      {item ? (
        <div>
          <img src={item.imageSrc} />
          <div>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <Button disabled={item.numInStock <= 0}>
              {item.numInStock <= 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ProductPage;
