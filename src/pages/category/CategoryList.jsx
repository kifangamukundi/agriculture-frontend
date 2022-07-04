import "../layout/list.css";
import { Description,
  Delete,
  Edit,
  Pageview,  } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteCategory, getCategories } from "../../redux/apiCalls/categoryCalls";

export default function CategoryList() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories.categories);

  useEffect(() => {
    // getCategories(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    // deleteCategory(id, dispatch);
  };

  return (
    <div className="list">
      <div className="listTitleContainer">
        <h1 className="listTitle">Category List</h1>
        <Link to="/NewCategory">
          <button className="listAddButton">Create</button>
        </Link>
      </div>
      <div className="listContainer">
        <div className="listShow">

        {categories && categories.length ? categories.map(category => (
          <div className="listShowBottom" key={category._id}>
            <span className="listShowTitle">{category.title}</span>
            <div className="listShowInfo">
              <Description className="listShowIcon" />
              <span className="listShowInfoTitle">{category.description}</span>
            </div>
            <div className="listShowActions">
              <div className="listShowInfo">
                <Link to={"/category/" + category._id}>
                  <button className="listActionButton"><Pageview className="listShowIcon" /></button>
                </Link>
              </div>
              <div className="listShowInfo">
                <Link to={"/category/" + category._id}>
                  <button className="listActionButton"><Edit className="listShowIcon" /></button>
                </Link>
              </div>
              <div className="listShowInfo">
                <button className="listActionButton" onClick={() => handleDelete(category._id)}><Delete className="listShowIcon" /></button>
              </div>
            </div>
          </div>
        )): null}

        </div>
      </div>
    </div>
  );
}
