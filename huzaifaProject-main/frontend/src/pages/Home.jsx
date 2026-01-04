import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="min-h-screen bg-gray-50">
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Loader />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Message variant="danger">
            {isError?.data.message || isError.error}
          </Message>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-0">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 hover:bg-pink-700 transition-colors duration-300 text-white font-bold rounded-full py-3 px-8 shadow-lg hover:shadow-xl"
            >
              Shop Now
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {data.products.map((product, index) => (
              <Product product={product} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
