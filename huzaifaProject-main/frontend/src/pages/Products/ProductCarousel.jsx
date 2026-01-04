import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const CustomNextArrow = (props) => (
    <div
      {...props}
      className="slick-arrow slick-next"
      style={{ background: "black", borderRadius: "50%" }}
    />
  );

  const CustomPrevArrow = (props) => (
    <div
      {...props}
      className="slick-arrow slick-prev"
      style={{ background: "black", borderRadius: "50%" }}
    />
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="h-full">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="h-full">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="h-full flex flex-col">
                <img
                  src={image}
                  alt={name}
                  className="w-full min-h-[60%] object-cover rounded-lg"
                />

                <div className="h-[40%] p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold truncate text-black">
                      {name}
                    </h2>
                    <p className="text-lg font-bold text-black">$ {price}</p>
                    <p className="text-sm line-clamp-1 text-black">
                      {description}
                    </p>
                  </div>

                  <div className="text-black flex  justify-between text-xs mt-2">
                    <div>
                      <div className="flex items-center">
                        <FaStore className="mr-1" /> {brand}
                      </div>
                      <div className="flex items-center">
                        <FaStar className="mr-1" /> {rating}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <FaShoppingCart className="mr-1" /> {quantity}
                      </div>
                      <div className="flex items-center">
                        <FaBox className="mr-1" /> {countInStock}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
