import "./productList.css";
import "../generics/generics.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls/productCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  return (
    <div className="productList">
      <table className="styled-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {products.products.map(product => (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>
                    <Link to={"/product/" + product._id}>
                      <button className="productListEdit">Edit</button>
                    </Link>
                      <button className="productListDelete" onClick={() => handleDelete(product._id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
