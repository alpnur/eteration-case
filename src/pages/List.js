import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectFilteredProducts,
  fetchProducts,
  setFilterSort,
  setFilterSearchBrand,
  setFilterToggleBrand,
  setFilterSearchModel,
  setFilterToggleModel,
  setCurrentPage,
} from "../store/productsSlice";
import { addProduct } from "../store/cartSlice";
const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredProducts = useSelector(selectFilteredProducts);
  const currentPage = useSelector((state) => state.products.currentPage);
   const totalProducts = useSelector((state) => state.products.products.length);
  const productsPerPage = useSelector(
    (state) => state.products.productsPerPage
  );
  const totalPages = Math.ceil(totalProducts/ productsPerPage);
  const brandSearch = useSelector(
    (state) => state.products.filters.brand.search
  );
  const brands = useSelector((state) => state.products.filters.brand.brands);
  const modelSearch = useSelector(
    (state) => state.products.filters.model.search
  );
  const models = useSelector((state) => state.products.filters.model.models);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  return (
    <div className="flex flex-wrap md:flex-nowrap">
      <div className="flex flex-col space-y-4 text-sm w-full md:w-1/3">
        {/* Sort By Card */}
        <div className="bg-white p-3 shadow-lg">
          <h2 className="font-bold">Sort By</h2>
          <ul className="mt-2 space-y-2">
            <li>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  className="mr-2"
                  onChange={() => dispatch(setFilterSort(1))}
                />
                Old to new
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  className="mr-2"
                  onChange={() => dispatch(setFilterSort(2))}
                />
                New to old
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  className="mr-2"
                  onChange={() => dispatch(setFilterSort(3))}
                />
                Price high to low
              </label>
            </li>
            <li>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sort"
                  className="mr-2"
                  onChange={() => dispatch(setFilterSort(4))}
                />
                Price low to high
              </label>
            </li>
          </ul>
        </div>

        {/* Brands Card */}
        <div className="bg-white p-4 shadow-lg">
          <h2 className="font-bold mb-1">Brands</h2>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 mb-4 border rounded"
            onChange={(event) =>
              dispatch(setFilterSearchBrand(event.target.value))
            }
          />
          <ul className="space-y-2 max-h-32 overflow-y-auto">
            {brands
              .filter((item) =>
                item.title
                  .toString()
                  .toLowerCase()
                  .includes(brandSearch.toString().toLowerCase())
              )
              .map((item) => (
                <li key={item.id}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={item.isSelected}
                      onChange={() =>
                        dispatch(setFilterToggleBrand({ brand: item }))
                      }
                    />
                    {item.title}
                  </label>
                </li>
              ))}
          </ul>
        </div>

        {/* Model Card */}
        <div className="bg-white p-4 shadow-lg">
          <h2 className="font-bold mb-1">Model</h2>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 mb-4 border rounded"
            onChange={(event) =>
              dispatch(setFilterSearchModel(event.target.value))
            }
          />
          <ul className="space-y-2 max-h-32 overflow-y-auto">
            {models
              .filter((item) =>
                item.title
                  .toString()
                  .toLowerCase()
                  .includes(modelSearch.toString().toLowerCase())
              )
              .map((item) => (
                <li key={item.id}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={item.isSelected}
                      onChange={() =>
                        dispatch(setFilterToggleModel({ model: item }))
                      }
                    />
                    {item.title}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Product List ve Pagination */}
      <div className="p-4 pe-0 pt-0 flex-grow flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {filteredProducts.map((product) => (
            <div
              className="p-3 flex flex-col border min-h-[22rem]"
              key={product.id}
            >
              <div className="bg-gray-300 h-48 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full"
                  onClick={() => {
                    navigate(`/detail/${product.id}`);
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold">{product.price} ₺</h3>
              <p className="text-gray-700">{product.name}</p>
              <div className="mt-auto">
                <button
                  className="bg-blue-500 text-white p-2 rounded-md w-full"
                  onClick={() => {
                    dispatch(addProduct(product));
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="w-full flex justify-center mt-6">
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <li key={page}>
                  <button
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default List;
