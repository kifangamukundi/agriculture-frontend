import "../layout/list.css";
import { Link, useNavigate , useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import { useSelector } from "react-redux";
import { fetchCategories, deleteCategory, selectCategoryById, getCategoriesStatus, getCategoriesError } from "../../redux/categorySlice";

export default function CategoryList() {
  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate ();
  const { categoryId } = useParams();
  const category = useSelector((state) => selectCategoryById(state, categoryId))
  console.log(category);
  const categories = useSelector((state) => state?.categories?.categories?.categories);
  const user = useSelector((state) => state?.users?.currentUser?.roles);

  // Status and error from the API call
  const categoryStatus = useSelector(getCategoriesStatus);
  const categoryError = useSelector(getCategoriesError);


  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(fetchCategories())
    }
  }, [categoryStatus, dispatch])

  const handleDelete = (id) => {
    dispatch(deleteCategory({ id })).unwrap()
    .then((originalPromiseResult) => {
      // handle result here
      console.log(originalPromiseResult)
      dispatch(fetchCategories());
      navigate("/CategoryList");
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
      console.log(rejectedValueOrSerializedError);
    })
  };

  return (
    <div className="list">
      <div className="listTitleContainer">
        <h1 className="listTitle">Categories List</h1>

        {(user?.includes("ROLE_MODERATOR") || user?.includes("ROLE_ADMIN")) && (
        <Link to="/NewCategory">
          <button className="listAddButton">Create</button>
        </Link>
        )}

      </div>
      {categoryStatus === 'loading' && <Box sx={{ width: '100%' }}><LinearProgress color="success" /></Box>}

      {(categoryStatus === 'succeeded' && !categories?.length) && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            No Categories — <strong>Found!</strong>
          </Alert>
        </Stack>
      )}

      <div className="listContainer">
        <div className="listShow">

        {categories && categories.length ? categories.map(category => (
          <div className="listShowBottom" key={category._id}>

            <div className="listUpdateRight">
              <div className="listUpdateUpload">
                    <img
                    className="listUpdateImg"
                    src={category.categoryImage}
                    alt=""
                    />
              </div>
            </div>

            <span className="listShowTitle"><h1>{category.title}</h1></span>
            <div className="listShowInfo">
              <span className="listShowInfoTitle">{category.description}</span>
            </div>

            <div className="listShowActions">
              
              <div className="listShowInfo">
                <Link to={"/ViewCategory/" + category._id}>
                  <Tooltip title="View">
                    <IconButton>
                      <PreviewIcon color="success"/>
                    </IconButton>
                  </Tooltip>
                </Link>
              </div>

              {(user?.includes("ROLE_MODERATOR") || user?.includes("ROLE_ADMIN")) && (
                <div className="listShowInfo">
                  <Link to={"/EditCategory/" + category._id}>
                    <Tooltip title="Edit">
                      <IconButton>
                        <EditIcon color="success"/>
                      </IconButton>
                    </Tooltip>
                  </Link>
                </div>
              )}

              {(user?.includes("ROLE_MODERATOR") || user?.includes("ROLE_ADMIN")) && (
                <div className="listShowInfo">
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(category._id)}>
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
