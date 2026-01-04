import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { useState } from "react";

const SmallProduct = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImageUrl = "https://placehold.co/400x400?text=Product+Image";

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="h-full w-full">
      <div className="relative h-[70%]">
        <img
          src={imageError ? fallbackImageUrl : product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded"
          onError={handleImageError}
          loading="lazy"
        />
        <HeartIcon product={product} />
      </div>

      <div className="h-[30%] p-2 flex items-center">
        <Link to={`/product/${product._id}`} className="w-full">
          <h2 className="flex justify-between items-center text-sm">
            <div className="truncate">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
