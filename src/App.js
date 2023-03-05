import { useState } from "react";
import {
  useGetGoodsQuery,
  useAddGoodsMutation,
  useDeleteGoodsMutation
} from "./redux/services/goodsApi";

function App() {
  const [count, setCount] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const { data = [], isLoading } = useGetGoodsQuery(count);

  const [addProduct, { isError }] = useAddGoodsMutation();
  const [deleteProduct] = useDeleteGoodsMutation();

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct("");
    }
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap();
  };

  console.log(isError);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-4">
          <input
            type="text"
            className="form-control"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-success w-100"
            onClick={handleAddProduct}>
            + Add New
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="position-relative mb-4">
            <select
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="form-control">
              <option value="">all</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
      </div>

      <ul className="list-unstyled">
        {data.map((item) => (
          <li
            key={item.id}
            className="row align-items-center mb-2">
            <div className="col-1">
              <strong className="me-2">{item?.id}</strong>
            </div>
            <div className="col-3">
              <span>{item?.name}</span>
            </div>
            <div className="col-2">
              <button
                className="btn btn-danger w-100"
                onClick={() => handleDeleteProduct(item.id)}>
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
