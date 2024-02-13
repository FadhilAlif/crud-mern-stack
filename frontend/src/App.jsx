import ProductList from "./components/ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

const App = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  };

  const { data } = useSWR("products", fetcher);
  if (!data) {
    return <h2>Loading...</h2>;
  }

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    mutate("products");
  };

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ProductList data={data} deleteProduct={deleteProduct} />}
          />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
