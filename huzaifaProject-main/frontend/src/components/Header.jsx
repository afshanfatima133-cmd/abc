import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h1 className="text-red-500 text-xl">Error loading products</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Featured Products Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 h-[500px] flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {data?.slice(0, 4).map((product) => (
                <div
                  key={product._id}
                  className="transform hover:scale-105 transition-transform duration-200 h-[200px]"
                >
                  <SmallProduct product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md h-[500px]">
            <div className="h-full w-full">
              <ProductCarousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
