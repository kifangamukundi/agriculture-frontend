import "./categoryList.css";
import "../generics/generics.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, getCategories } from "../../redux/apiCalls/categoryCalls";

export default function CategoryList() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    getCategories(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteCategory(id, dispatch);
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
            {categories.categories.map(category => (
                <tr key={category._id}>
                    <td>{category._id}</td>
                    <td>{category.title}</td>
                    <td>{category.description}</td>
                    <td>
                      <Link to={"/category/" + category._id}>
                        <button className="productListEdit">Edit</button>
                      </Link>
                        <button className="productListDelete" onClick={() => handleDelete(category._id)}>
                          Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
