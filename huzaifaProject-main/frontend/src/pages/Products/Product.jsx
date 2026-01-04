import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const Product = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = "https://placehold.co/300x300?text=Product+Image";

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div className="p-3 transform transition-transform duration-300 hover:scale-105">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-[300px]">
          <img
            src={imgError ? fallbackImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <HeartIcon product={product} />
        </div>

        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-pink-500">
              {product.name}
            </h2>

            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                ({product.numReviews} reviews)
              </span>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-pink-600">
                ${product.price}
              </span>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
                View Details
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
