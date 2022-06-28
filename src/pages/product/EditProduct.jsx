import "../layout/edit.css";
import { Link, useNavigate , useLocation } from "react-router-dom";
import { Description, Title, List, Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts, updateProduct, getProductsStatus, getProductsError } from "../../redux/productSlice";

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

export default function Product() {
  let dispatch = useDispatch();
  let navigate = useNavigate ();
  const location = useLocation();

  // Status and error from the API call
  const productStatus = useSelector(getProductsStatus);
  const productError = useSelector(getProductsError);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState([]);

  const [state, setState] = useState({
    title: '',
    description: '',
    categories: []
  }
  );

  const productId = location.pathname.split("/")[2];

  const product = useSelector((state) =>
    state.products.products.products.find((product) => product._id === productId)
  );

  useEffect(() => {
    if (product) {
        setState({ ...product });
    }
  }, [product]);

  const { title, description } = state;

  const handleTextChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updateProduct({ id: product._id, ...state })).unwrap()
    .then((originalPromiseResult) => {
      // handle result here
      console.log(originalPromiseResult)
      dispatch(fetchProducts());
      navigate("/ProductList");
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
      console.log(rejectedValueOrSerializedError)
      setApiError(rejectedValueOrSerializedError)
      setLoading(false)
    })
  }

  return (
    <div className="edit">
      <div className="editTitleContainer">
        <h1 className="editTitle">Edit Product</h1>
        <Link to="/ProductList">
          <button className="editAddButton">All</button>
        </Link>
      </div>
      {productStatus === 'loading' && <Box sx={{ width: '100%' }}><LinearProgress color="secondary" /></Box>}

      {(productStatus === 'failed') && (
        <Stack sx={{ width: '100%' }} spacing={2}>
           <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Error — <strong>{apiError.message}!</strong>
            </Alert>
        </Stack>
      )}

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
              <LoadingButton
                size="small"
                onClick={handleOnSubmit}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained">
                Save
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}