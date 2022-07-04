import "../layout/view.css";
import { Link, useParams } from "react-router-dom";
import { DoneOutline, Title, List } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectProductById, getProductsStatus, getProductsError } from "../../redux/productSlice";

export default function ViewProduct() {
  const { productId } = useParams();
  const product = useSelector((state) => selectProductById(state, productId))
  console.log(product);

  const productStatus = useSelector(getProductsStatus);
  const productError = useSelector(getProductsError);

  return (
    <div className="view">
      <div className="viewTitleContainer">
        <h1 className="viewTitle">View Product</h1>
        <Link to="/ProductList">
          <button className="viewAddButton">All</button>
        </Link>
      </div>
      <div className="viewContainer">
        <div className="viewShow">
          <div className="viewShowBottom">
            <span className="viewShowTitle">Product Details</span>
            <div className="viewShowInfo">
              <DoneOutline className="viewShowIcon" />
              <span className="viewShowInfoTitle">{product._id}</span>
            </div>
            <div className="viewShowInfo">
              <Title className="viewShowIcon" />
              <span className="viewShowInfoTitle">{product.title}</span>
            </div>
            <span className="viewShowTitle">Product Categories</span>

            {product.categories.map(category => (
            <div className="viewShowInfo" key={category._id}>
              <List className="viewShowIcon" />
              <span className="viewShowInfoTitle">{category.title}</span>
            </div>
            ))}
          </div>
        </div>
        <div className="viewUpdate">
          <span className="viewUpdateTitle">Other Details</span>
          <div className="viewUpdateForm">
            <div className="viewUpdateLeft">

              <div className="viewUpdateItem">
                <label>Description</label>
                <span className="viewShowInfoTitle">{product.description}</span>
              </div>

              <div className="viewUpdateItem">
                <label>Description</label>
                <span className="viewShowInfoTitle">{product.description}</span>
              </div>
            
            </div>
            <div className="viewUpdateRight">
              <div className="viewUpdateUpload">
                    <img
                    className="viewUpdateImg"
                    src={product.productImage}
                    alt=""
                    />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
