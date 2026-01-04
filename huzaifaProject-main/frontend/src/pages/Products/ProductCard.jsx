import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const handleImageError = () => {
    setImgError(true);
  };

  const fallbackImageUrl = "https://placehold.co/600x400?text=Product+Image";

  return (
    <div className=" transform transition-transform duration-300 hover:scale-105">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-[200px]">
          <img
            src={imgError ? fallbackImageUrl : p.image}
            alt={p.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute top-3 right-3">
            <HeartIcon product={p} />
          </div>
          <span className="absolute bottom-3 right-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {p?.brand}
          </span>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-pink-500 transition-colors truncate">
            {p?.name}
          </h2>

          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < Math.floor(p.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">({p.numReviews} reviews)</span>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">{p?.description}</p>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-pink-600">
              {p?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>

            <div className="flex items-center gap-2">
              <button
                className="p-1 rounded-full hover:bg-pink-100 transition-colors text-pink-500"
                onClick={() => addToCartHandler(p, 1)}
              >
                <AiOutlineShoppingCart size={22} />
              </button>

              <Link
                to={`/product/${p._id}`}
                className="bg-pink-500 text-white px-2 py-1 rounded-full hover:bg-pink-600 transition-colors text-sm font-semibold whitespace-nowrap"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
