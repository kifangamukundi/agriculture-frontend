import "../layout/list.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls/productCalls";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';

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

        {(user?.includes("ROLE_MODERATOR") || user?.includes("ROLE_ADMIN")) && (
        <Link to="/NewProduct">
          <button className="listAddButton">Create</button>
        </Link>
        )}

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
                  <Tooltip title="View">
                    <IconButton>
                      <PreviewIcon color="success"/>
                    </IconButton>
                  </Tooltip>
                </Link>
              </div>

              {(user?.includes("ROLE_MODERATOR") || user?.includes("ROLE_ADMIN")) && (
                <div className="listShowInfo">
                  <Link to={"/EditProduct/" + product._id}>
                    <Tooltip title="Edit">
                      <IconButton>
                        <EditIcon color="success"/>
                      </IconButton>
                    </Tooltip>
                  </Link>
                </div>
              )}

              {user?.includes("ROLE_ADMIN") && (
                <div className="listShowInfo">
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(product._id)}>
                        <DeleteIcon color="success"/>
                      </IconButton>
                    </Tooltip>
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
