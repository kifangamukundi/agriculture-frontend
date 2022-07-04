import { useState } from "react";
import "../layout/new.css";
import { useNavigate  } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addNewProduct, fetchProducts, getProductsStatus, getProductsError } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function NewProduct() {
  const dispatch = useDispatch();
  let navigate = useNavigate ();

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const productStatus = useSelector(getProductsStatus);
  const productError = useSelector(getProductsError);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState([]);

  // Categories stuff
  const theme = useTheme();
  const categories = useSelector((state) => state?.categories?.categories?.categories);
  const [categoryName, setCategoryName] = useState([]);

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, productImage: downloadURL, categories: categoryName };
          dispatch(addNewProduct(product)).unwrap()
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
        });
      }
    );
  };

  return (
    <div className="newItem">
      <h1 className="addItemTitle">New Product</h1>
      {productStatus === 'loading' && <Box sx={{ width: '100%' }}><LinearProgress color="secondary" /></Box>}

      {(productStatus === 'failed') && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Error — <strong>{apiError.message}!</strong>
          </Alert>
        </Stack>
      )}

      <form className="addItemForm">
        <Box sx={{ width: 500, maxWidth: '100%',}} >
          <div className="addItemItem">
            <label>Image</label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          
            <Stack sx={{ width: '100%' }} spacing={2}>
              <label>Title</label>
              <TextField required fullWidth label="Product Name" id="Title" name="title" onChange={handleChange} />
            </Stack>

            <Stack sx={{ width: '100%' }} spacing={2}>
              <label>Description</label>
              <TextField
                required
                fullWidth
                multiline
                label="Product Description"
                id="Description"
                name="description"
                onChange={handleChange}
                rows={4}
                maxRows={6}
              />
            </Stack>

            <Stack sx={{ width: '100%' }} spacing={2}>
              <label>Categories</label>
              <FormControl sx={{ m: 1, width: 500 }} >
                <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={categoryName}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value, key) => (
                        <Chip key={key} label={value} color="success"/>
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {categories.map((category) => (
                    <MenuItem
                      value={category._id}
                      key={category._id}
                      style={getStyles(category, categoryName, theme)}
                    >
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack sx={{ width: '25%' }} spacing={2}>
              <LoadingButton
                size="small"
                onClick={handleClick}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained">
                Save
              </LoadingButton>
            </Stack>

        </Box>
      </form>
    </div>
  );
}
