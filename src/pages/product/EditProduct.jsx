import "../layout/edit.css";
import { Link, useNavigate , useLocation } from "react-router-dom";
import { Description, Title, List, Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProduct, getProducts } from "../../redux/apiCalls/productCalls";

export default function Product() {
  let dispatch = useDispatch();
  let navigate = useNavigate ();
  const location = useLocation();

  const [state, setState] = useState({
    title: '',
    description: '',
    categories: []
  }
  );
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.products.find((product) => product._id === productId)
  );

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  useEffect(() => {
    if (product) {
        setState({ ...product });
    }
  }, [product]);

  const { title, description } = state;

  const handleTextChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log(state);
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateProduct(productId, state, dispatch);
    navigate("/Dashboard");
  }

  return (
    <div className="edit">
      <div className="editTitleContainer">
        <h1 className="editTitle">Edit Product</h1>
        <Link to="/ProductList">
          <button className="editAddButton">All</button>
        </Link>
      </div>
      <div className="editContainer">
        <div className="editShow">
          <div className="editShowBottom">
            <span className="editShowTitle">Product Details</span>
            <div className="editShowInfo">
              <Title className="editShowIcon" />
              <span className="editShowInfoTitle">{product.title}</span>
            </div>
            <div className="editShowInfo">
              <Description className="editShowIcon" />
              <span className="editShowInfoTitle">{product.description}</span>
            </div>
            <span className="editShowTitle">Category List</span>

            {product.categories.map(category => (
            <div className="editShowInfo">
              <List className="editShowIcon" />
              <span className="editShowInfoTitle" key={category._id}>{category.title}</span>
            </div>
            ))}
          </div>
        </div>
        <div className="editUpdate">
          <span className="editUpdateTitle">Edit</span>
          <form className="editUpdateForm" onSubmit={handleOnSubmit}>
            <div className="editUpdateLeft">
              <div className="editUpdateItem">
                <label>Title</label>
                <input
                  type="text" 
                  name="title"
                  onChange={handleTextChange}
                  value={title || ""}
                  className="editUpdateInput"
                />
              </div>
              <div className="editUpdateItem">
                <label>Description</label>
                <input
                  type="text" 
                  name="description"
                  onChange={handleTextChange}
                  value={description || ""}
                  className="editUpdateInput"
                />
              </div>
            </div>
            <div className="editUpdateRight">
              <div className="editUpdateUpload">
                <img
                  className="editUpdateImg"
                  src={product.productImage}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="editUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="editUpdateButton" onChange={handleTextChange}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
