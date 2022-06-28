import "../layout/view.css";
import { Link, useLocation } from "react-router-dom";
import { DoneOutline, Title, List } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError } from "../../redux/postsSlice";

export default function ViewProduct() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const product = useSelector((state) =>
    state.posts.posts.products.find((product) => product._id === productId)
  );

  const post = useSelector(selectAllPosts).products.find(product => product._id === productId);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

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
              <span className="viewShowInfoTitle">{post._id}</span>
            </div>
            <div className="viewShowInfo">
              <Title className="viewShowIcon" />
              <span className="viewShowInfoTitle">{post.title}</span>
            </div>
            <span className="viewShowTitle">Product Categories</span>

            {post.categories.map(category => (
            <div className="viewShowInfo">
              <List className="viewShowIcon" />
              <span className="viewShowInfoTitle" key={category._id}>{category.title}</span>
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
                <span className="viewShowInfoTitle">{post.description}</span>
              </div>

              <div className="viewUpdateItem">
                <label>Description</label>
                <span className="viewShowInfoTitle">{post.description}</span>
              </div>
            
            </div>
            <div className="viewUpdateRight">
              <div className="viewUpdateUpload">
                    <img
                    className="viewUpdateImg"
                    src={post.productImage}
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
