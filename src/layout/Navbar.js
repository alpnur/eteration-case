import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  setFilterSearch,
} from "../store/productsSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.products.filters.search);
  const {totalPrice} = useSelector((state) => state.cart);

  return (
    <nav className="bg-blue-600 px-6 py-2">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Eteration</div>
        <div className="relative w-full sm:w-1/3 mt-2 sm:mt-0">
          <input
            type="text"
            placeholder="Search"
            value={search}
            className="w-full p-2 rounded border border-gray-300"
            onChange={(event) => dispatch(setFilterSearch(event.target.value))}
          />
        </div>
        <div className="text-white flex items-center mt-2 sm:mt-0 space-x-2">
          <span className="text-sm">{totalPrice} ₺</span>
          <span className="text-sm">Hatice</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
