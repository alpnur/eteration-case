import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';
import axios from "axios";
import moment from "moment";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://5fc9346b2af77700165ae514.mockapi.io/products"
    );
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    filters: {
      search: "",
      sort: 0,
      brand: {
        search: "",
        brands: [],
      },
      model: {
        search: "",
        models: [],
      },
    },
    currentPage: 1,
    productsPerPage: 12,
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setFilterSearch: (state, action) => {
      state.filters.search = action.payload;
    },
    setFilterSort: (state, action) => {
      state.filters.sort = action.payload;
    },
    setFilterSearchBrand: (state, action) => {
      state.filters.brand.search = action.payload;
    },
    setFilterToggleBrand: (state, action) => {
      const index = state.filters.brand.brands.findIndex(item => item.id === action.payload.brand.id);
      state.filters.brand.brands[index].isSelected = !state.filters.brand.brands[index].isSelected;

      const selectedBrands = state.filters.brand.brands.filter(item => item.isSelected).map(item => item.title);

      if (selectedBrands.length) {
        state.filters.model.models = [
          ...new Set(state.products
            .filter(item => selectedBrands.includes(item.brand))
            .map(item => item.model))
        ]
          .map((item, index) => ({
            id: index + 1,
            title: item,
            isSelected: false
          }));
      } else {
        state.filters.model.models = [
          ...new Set(state.products.map((item) => item.model)),
        ].map((item, index) => {
          return {
            id: index + 1,
            title: item,
            isSelected: false,
          };
        });
      }
    },
    setFilterSearchModel: (state, action) => {
      state.filters.model.search = action.payload;
    },
    setFilterToggleModel: (state, action) => {
      const index = state.filters.model.models.findIndex(item => item.id === action.payload.model.id);
      state.filters.model.models[index].isSelected = !state.filters.model.models[index].isSelected;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filters.brand.brands = [
          ...new Set(state.products.map((item) => item.brand)),
        ].map((item, index) => {
          return {
            id: index + 1,
            title: item,
            isSelected: false,
          };
        });
        state.filters.model.models = [
          ...new Set(state.products.map((item) => item.model)),
        ].map((item, index) => {
          return {
            id: index + 1,
            title: item,
            isSelected: false,
          };
        });
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const selectProductsState = (state) => state.products;
const selectFilters = (state) => state.products.filters;
const selectCurrentPage = (state) => state.products.currentPage;
const selectProductsPerPage = (state) => state.products.productsPerPage;
const selectProducts = (state) => state.products.products;

// Memoize edilmiş selectFilteredProducts selector'ı
export const selectFilteredProducts = createSelector(
  [selectProducts, selectFilters, selectCurrentPage, selectProductsPerPage],
  (products, filters, currentPage, productsPerPage) => {
    const { search, brand, model, sort } = filters;

    let filteredProducts = products
      .filter((product) => search ? product.name.toLowerCase().includes(search.toLowerCase()) : true)
      .filter((product) => {
        const selectedBrands = brand.brands.filter(item => item.isSelected).map(item => item.title);
        return selectedBrands.length ? selectedBrands.includes(product.brand) : true;
      })
      .filter((product) => {
        const selectedModels = model.models.filter(item => item.isSelected).map(item => item.title);
        return selectedModels.length ? selectedModels.includes(product.model) : true;
      });

    // Sort the products
    switch (sort) {
      case 1: // CreatedAt (New to Old)
        filteredProducts = filteredProducts.sort(
          (a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
        );
        break;
      case 2: // CreatedAt (Old to New)
        filteredProducts = filteredProducts.sort(
          (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
        );
        break;
      case 3: // Price (High to Low)
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 4: // Price (Low to High)
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }
);

export const {
  setFilterSearch,
  setFilterSort,
  setFilterSearchBrand,
  setFilterToggleBrand,
  setFilterSearchModel,
  setFilterToggleModel,
  setCurrentPage
} = productsSlice.actions;

export default productsSlice.reducer;
