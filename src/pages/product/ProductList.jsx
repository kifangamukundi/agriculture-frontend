import "../layout/list.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import Chip from '@mui/material/Chip';

import { selectAllProducts, fetchProducts, deleteProduct, getProductsStatus, getProductsError } from "../../redux/productSlice";

export default function ProductList() {
  const dispatch = useDispatch();
  let navigate = useNavigate ();
  const products = useSelector((state) => selectAllProducts(state))
  console.log(products);
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
  const handleChip = () => {
    console.info('You clicked the Chip.');
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
        
      <List sx={{ width: '100%', maxWidth: "75%", bgcolor: 'background.paper' }}>
        {products && products.length ? products.map(product => (
          <div>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={product.title} src={product.productImage} />
              </ListItemAvatar>
              <ListItemText
                primary={product.title}
                secondary={
                  <Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {product.title.substring(0, 20)}
                    </Typography>
                      - {product.description.substring(0, 65)}...

                    <Box sx={{ width: 500, maxWidth: '100%',}} >
                      {product.categories && product.categories.length ? product.categories.map(category => (
                        <Link to={"/ViewCategory/" + category._id} style={{ textDecoration: 'none' }}>
                          <Chip label={category.title} onClick={handleChip} />
                        </Link>
                      )) : null}
                    </Box>

                    <Box sx={{ width: 500, maxWidth: '100%',}} >
                      <Link to={"/ViewProduct/" + product._id}>
                        <Tooltip title="View">
                          <IconButton>
                            <PreviewIcon color="success"/>
                          </IconButton>
                        </Tooltip>
                      </Link>

                      {(user?.includes("ROLE_MODERATOR") || user?.includes("ROLE_ADMIN")) && (
                        <Link to={"/EditProduct/" + product._id}>
                          <Tooltip title="Edit">
                            <IconButton>
                              <EditIcon color="success"/>
                            </IconButton>
                          </Tooltip>
                        </Link>
                      )}
                      
                      {(user?.includes("ROLE_MODERATOR") || user?.includes("ROLE_ADMIN")) && (
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(product._id)}>
                            <DeleteIcon color="success"/>
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        )): null}
      </List>  
    </div>
  );
}
