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
  const products = useSelector((state) => state.product.products.products);
  const user = useSelector((state) => state?.user?.currentUser?.roles);

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
        <Link to="/NewProduct">
          <button className="listAddButton">Create</button>
        </Link>
      </div>
      <div className="listContainer">
        <div className="listShow">

        {products && products.length ? products.map(product => (
          <div className="listShowBottom" key={product._id}>

            <div className="listUpdateRight">
              <div className="listUpdateUpload">
                    <img
                    className="listUpdateImg"
                    src={product.productImage}
                    alt=""
                    />
              </div>
            </div>

            <span className="listShowTitle"><h1>{product.title}</h1></span>
            <div className="listShowInfo">
              <span className="listShowInfoTitle">{product.description}</span>
            </div>

            <div className="listShowActions">
              
              <div className="listShowInfo">
                <Link to={"/ViewProduct/" + product._id}>
                  <button className="listActionButton"><Pageview className="listShowIcon" /></button>
                </Link>
              </div>

              {user?.includes("ROLE_MODERATOR") && (
                <div className="listShowInfo">
                  <Link to={"/EditProduct/" + product._id}>
                    <button className="listActionButton"><Edit className="listShowIcon" /></button>
                  </Link>
                </div>
              )}

              {user?.includes("ROLE_ADMIN") && (
                <div className="listShowInfo">
                  <button className="listActionButton" onClick={() => handleDelete(product._id)}><Delete className="listShowIcon" /></button>
                </div>
              )}

            </div>
          </div>
        )): null}

        </div>
      </div>
    </div>
  );
}
