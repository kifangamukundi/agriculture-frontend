import "../layout/list.css";
import { Description,
  Delete,
  Edit,
  Pageview, } from "@material-ui/icons";
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
    <div className="list">
      <div className="listTitleContainer">
        <h1 className="listTitle">Products List</h1>
        <Link to="/newProduct">
          <button className="listAddButton">Create</button>
        </Link>
      </div>
      <div className="listContainer">
        <div className="listShow">

        {products.products.map(product => (
          <div className="listShowBottom">
            <span className="listShowTitle">{product.title}</span>
            <div className="listShowInfo">
              <Description className="listShowIcon" />
              <span className="listShowInfoTitle">{product.description}</span>
            </div>
            <div className="listShowActions">
              <div className="listShowInfo">
                <Link to={"/product/" + product._id}>
                  <button className="listActionButton"><Pageview className="listShowIcon" /></button>
                </Link>
              </div>
              <div className="listShowInfo">
                <Link to={"/product/" + product._id}>
                  <button className="listActionButton"><Edit className="listShowIcon" /></button>
                </Link>
              </div>
              <div className="listShowInfo">
                <button className="listActionButton" onClick={() => handleDelete(product._id)}><Delete className="listShowIcon" /></button>
              </div>
            </div>
          </div>
        ))}

        </div>
      </div>
    </div>
  );
}
