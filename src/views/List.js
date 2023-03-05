import { useEffect, useState, useCallback } from "react";
import { useFetchGoodsMutation, useDeleteGoodsMutation } from "redux/services/goodsApi";

const Item = ({ item, handleDeleteProduct }) => {
  return (
    <li className="row align-items-center mb-2">
      <div className="col-1">
        <strong className="me-2">{item?.id}</strong>
      </div>
      <div className="col-3">
        <span>{item?.name}</span>
      </div>
      <div className="col-2">
        <button
          className="btn btn-danger w-100"
          onClick={() => handleDeleteProduct(item?.id)}>
          delete
        </button>
      </div>
    </li>
  );
};

const List = () => {
  const [getGoods, { isLoading: isGetGoodsLoading }] = useFetchGoodsMutation();
  const [deleteGoods, { isLoading: isDeleteGoodsLoading }] = useDeleteGoodsMutation();

  const isLoading = isGetGoodsLoading || isDeleteGoodsLoading;

  const [results, setResults] = useState([]);

  const fetchData = useCallback(async () => {
    const { data } = await getGoods();
    setResults(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProduct = async (id) => {
    await deleteGoods(id).unwrap();
  };

  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <>
      <h2 className="h2 mb-3">List</h2>
      {results.length !== 0 ? (
        <ul className="list-unstyled">
          {results.map((item) => (
            <Item
              key={item.id}
              item={item}
              handleDeleteProduct={handleDeleteProduct}
            />
          ))}
        </ul>
      ) : (
        <>Empty</>
      )}
    </>
  );
};

export default List;
