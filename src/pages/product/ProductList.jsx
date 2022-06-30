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
import { fetchProducts, deleteProduct, selectProductById, getProductsStatus, getProductsError } from "../../redux/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate ();
  const { productId } = useParams();
  const product = useSelector((state) => selectProductById(state, Number(productId)))
  const products = useSelector((state) => state?.products?.products?.products);
  const user = useSelector((state) => state?.users?.currentUser?.roles);

  // Status and error from the API call
  const productStatus = useSelector(getProductsStatus);
  const productError = useSelector(getProductsError);


  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts())
    }
  }, [productStatus, dispatch])

  const handleDelete = (id) => {
    dispatch(deleteProduct({ id })).unwrap()
    .then((originalPromiseResult) => {
      // handle result here
      console.log(originalPromiseResult)
      dispatch(fetchProducts());
      navigate("/ProductList");
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
      console.log(rejectedValueOrSerializedError);
    })
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
      {productStatus === 'loading' && <Box sx={{ width: '100%' }}><LinearProgress color="success" /></Box>}

      {(productStatus === 'succeeded' && !products?.length) && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            No Products — <strong>Found!</strong>
          </Alert>
        </Stack>
      )}

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

              {(user?.includes("ROLE_MODERATOR") || user?.includes("ROLE_ADMIN")) && (
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
