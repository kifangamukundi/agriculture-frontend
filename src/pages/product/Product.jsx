import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct, getProducts } from "../../redux/apiCalls/productCalls";

export default function Product() {
  let dispatch = useDispatch();
  let history = useHistory();
  const location = useLocation();
  let { id } = useParams();

  const [state, setState] = useState({
    title: '',
    description: ''
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
    history.push("/");
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
    
      <div className="productBottom">
        <form className="productForm" onSubmit={handleOnSubmit}>
          <div className="productFormLeft">
            <label>Product Title</label>
            <input 
              type="text" 
              name="title"
              onChange={handleTextChange}
              value={title || ""}
            />
            <label>Product Description</label>
            <input 
              type="text" 
              name="description"
              onChange={handleTextChange}
              value={description || ""}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src="#" alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onChange={handleTextChange}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
