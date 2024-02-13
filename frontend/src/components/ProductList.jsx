import { Link } from "react-router-dom";

const ProductList = ({ data, deleteProduct }) => {
  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-1 px-3 rounded">
          <Link to={"/add"}>Add Product</Link>
        </button>
        <div className="relative shadow rounded-lg mt-3">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-200">
              <tr>
                <th className="px-1 py-3 text-center">No</th>
                <th className="px-1 py-3">Product Name</th>
                <th className="px-1 py-3">Price</th>
                <th className="px-1 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr key={product.id} className="bg-white border-b">
                  <td className="px-1 py-3 text-center">{index + 1}</td>
                  <td className="px-1 py-3 font-medium text-slate-900">
                    {product.name}
                  </td>
                  <td className="px-1 py-3">{product.price}</td>
                  <td className="px-1 py-3 text-center">
                    <Link
                      to={`/edit/${product.id}`}
                      className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-1 px-3 rounded mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-700 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
