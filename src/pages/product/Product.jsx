import { Link, useHistory, useLocation } from "react-router-dom";
import "./product.css";
import { Description, Title, List, Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateProduct, getProducts } from "../../redux/apiCalls/productCalls";

export default function Product() {
  let dispatch = useDispatch();
  let history = useHistory();
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

  const { title, description, categories } = state;

  const handleTextChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log(state);
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateProduct(productId, state, dispatch);
    history.push("/");
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Product</h1>
        <Link to="/newProduct">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowBottom">
            <span className="userShowTitle">Product Details</span>
            <div className="userShowInfo">
              <Title className="userShowIcon" />
              <span className="userShowInfoTitle">{product.title}</span>
            </div>
            <div className="userShowInfo">
              <Description className="userShowIcon" />
              <span className="userShowInfoTitle">{product.description}</span>
            </div>
            <span className="userShowTitle">Category List</span>

            {product.categories.map(category => (
            <div className="userShowInfo">
              <List className="userShowIcon" />
              <span className="userShowInfoTitle" key={category._id}>{category.title}</span>
            </div>
            ))}
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleOnSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Title</label>
                <input
                  type="text" 
                  name="title"
                  onChange={handleTextChange}
                  value={title || ""}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Description</label>
                <input
                  type="text" 
                  name="description"
                  onChange={handleTextChange}
                  value={description || ""}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onChange={handleTextChange}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
