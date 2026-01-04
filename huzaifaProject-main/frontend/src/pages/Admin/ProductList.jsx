import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    try {
      const file = e.target.files[0];
      console.log("File selected:", file?.name, file?.type);

      if (!file) {
        toast.error("Please select a file");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);

      // Debug FormData
      for (let pair of formData.entries()) {
        console.log(`FormData Content - ${pair[0]}: `, pair[1]);
      }

      const response = await uploadProductImage(formData).unwrap();
      console.log("Upload Response:", response);

      if (response.image) {
        setImage(response.image);
        setImageUrl(response.image);
        toast.success("Image uploaded successfully");
      }
    } catch (error) {
      console.error("Upload error details:", error);
      toast.error(error?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h2 className="text-2xl font-semibold mb-6">Create Product</h2>

          <div className="bg-gray-200 rounded-xl shadow-xl shadow-red-200 p-6">
            {imageUrl && (
              <div className="mb-6">
                <img
                  src={imageUrl}
                  alt="product"
                  className="block mx-auto max-h-[200px] rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="mb-6">
              <label className="border-2 border-dashed border-gray-500 text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-8 hover:border-pink-500 transition duration-300">
                {image ? image.name : "Click to Upload Image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="block text-gray-800 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg   focus:border-pink-500 focus:outline-none transition duration-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-800 mb-2">Price</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg   focus:border-pink-500 focus:outline-none transition duration-300"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-800 mb-2">Quantity</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg   focus:border-pink-500 focus:outline-none transition duration-300"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-800 mb-2">Brand</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg   focus:border-pink-500 focus:outline-none transition duration-300"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group my-6">
              <label className="block text-gray-800 mb-2">Description</label>
              <textarea
                className="w-full p-3 border rounded-lg   focus:border-pink-500 focus:outline-none transition duration-300 min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="block text-gray-800 mb-2">
                  Count In Stock
                </label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg   focus:border-pink-500 focus:outline-none transition duration-300"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="block text-gray-800 mb-2">Category</label>
                <select
                  className="w-full p-3 border rounded-lg   focus:border-pink-500 focus:outline-none transition duration-300"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 px-6 mt-6 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition duration-300 "
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
