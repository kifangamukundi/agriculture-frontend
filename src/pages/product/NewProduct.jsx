import { useState } from "react";
import "../layout/new.css";
import { Link, useNavigate , useLocation } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addNewPost, fetchPosts, getPostsStatus, getPostsError } from "../../redux/postsSlice";
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

export default function NewProduct() {
  const dispatch = useDispatch();
  let navigate = useNavigate ();

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const postStatus = useSelector(getPostsStatus);
  const postError = useSelector(getPostsError);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState([]);

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
          const product = { ...inputs, productImage: downloadURL };
          dispatch(addNewPost(product)).unwrap()
          .then((originalPromiseResult) => {
            // handle result here
            console.log(originalPromiseResult)
            dispatch(fetchPosts());
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
      {postStatus === 'loading' && <Box sx={{ width: '100%' }}><LinearProgress color="secondary" /></Box>}

      {(postStatus === 'failed') && (
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
