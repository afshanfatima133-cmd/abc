import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Filters</h2>

              {/* Categories Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b border-gray-200 pb-2">
                  Categories
                </h3>
                <div className="space-y-2.5">
                  {categories?.map((c) => (
                    <div key={c._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={c._id}
                        onChange={(e) => handleCheck(e.target.checked, c._id)}
                        className="w-4 h-4 text-pink-500 rounded border-gray-300 focus:ring-pink-400 cursor-pointer"
                      />
                      <label
                        htmlFor={c._id}
                        className="ml-3 text-gray-600 text-sm cursor-pointer hover:text-pink-500 transition-colors"
                      >
                        {c.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b border-gray-200 pb-2">
                  Brands
                </h3>
                <div className="space-y-2.5">
                  {uniqueBrands?.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="radio"
                        id={brand}
                        name="brand"
                        onChange={() => handleBrandClick(brand)}
                        className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-400 cursor-pointer"
                      />
                      <label
                        htmlFor={brand}
                        className="ml-3 text-gray-600 text-sm cursor-pointer hover:text-pink-500 transition-colors"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b border-gray-200 pb-2">
                  Price
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter price..."
                    value={priceFilter}
                    onChange={handlePriceChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-500 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-800 text-white py-2.5 px-4 rounded-lg hover:bg-gray-700 transition duration-300 text-sm font-medium focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:w-3/4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {products?.length} Products Found
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {products.length === 0 ? (
                <div className="col-span-full">
                  <Loader />
                </div>
              ) : (
                products?.map((p) => <ProductCard key={p._id} p={p} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
