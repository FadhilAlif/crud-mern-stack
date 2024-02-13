import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSWRConfig } from "swr";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setName(response.data.name);
      setPrice(response.data.price);
    };

    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    await axios.patch(`http://localhost:5000/products/${id}`, {
      name: name,
      price: parseInt(price),
    });

    navigate("/");
    mutate("products");
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <div className="text-2xl font-medium text-slate-700">Edit Product</div>
      <form onSubmit={updateProduct} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label className="font-bold text-slate-700">Product Name</label>
            <input
              type="text"
              className="w-full py-3 px-3 mt-1 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-700">Price</label>
            <input
              type="text"
              className="w-full py-3 px-3 mt-1 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <button
            type="submit"
            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border border-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
