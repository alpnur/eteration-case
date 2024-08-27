import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartProducts, totalPrice } = useSelector((state) => state.cart);

  return (
    <div className="p-4 w-full">
      <div className="shadow-lg p-4 rounded-lg bg-white">
        <h2 className="text-gray-500 text-sm mb-4">Cart</h2>
        <ul className="space-y-4">
          {cartProducts.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                <span className="text-gray-800">{item.name}</span>
                <p className="text-blue-500">
                  {parseFloat(item.price).toLocaleString("tr-TR", {
                    minimumFractionDigits: 0,
                  })}{" "}
                  ₺
                </p>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-gray-200 text-gray-800 w-8 h-8 flex items-center justify-center rounded-l"
                  onClick={() => dispatch(removeProduct(item))}
                >
                  -
                </button>
                <span className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center">
                  {item.quantity}
                </span>
                <button
                  className="bg-gray-200 text-gray-800 w-8 h-8 flex items-center justify-center rounded-r"
                  onClick={() => dispatch(addProduct(item))}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="shadow-lg p-4 rounded-lg bg-white mt-6">
        <h2 className="text-gray-500 text-sm mb-4">Checkout</h2>
        <p className="text-lg">
          Total Price:{" "}
          <span className="text-blue-500">
            {parseFloat(totalPrice).toLocaleString("tr-TR", {
              minimumFractionDigits: 3,
            })}{" "}
            ₺
          </span>
        </p>
        <button className="bg-blue-500 text-white mt-4 py-2 rounded-md w-full">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
