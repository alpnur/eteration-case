import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../store/cartSlice";
const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [product, setProduct] = useState({
    createdAt: "",
    name: "",
    image: "",
    price: "",
    description: "",
    model: "",
    brand: "",
    id: "",
  });

  useEffect(() => {
    if (id) {
      setProduct(products.find((item) => +item.id === +id));
    }
  }, [id]);
  return (
    <div className="flex flex-col md:flex-row p-4 shadow-2xl w-[1061px] h-[457px]">
      <div className="flex-shrink-0 w-full md:w-2/3 lg:w-3/5 bg-gray-300 h-full">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col p-4 flex-grow h-full">
        <div className="flex-shrink-0">
          <h1 className="text-2xl">{product.name}</h1>
          <h2 className="text-xl text-blue-600">{product.price} ₺</h2>
          <button className="bg-blue-500 text-white p-2 rounded-md mt-4 w-full" onClick={()=>{dispatch(addProduct(product))}}>
            Add to Cart
          </button>
        </div>
        <div className="flex-grow mt-4 overflow-y-auto">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
