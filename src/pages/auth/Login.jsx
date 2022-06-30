import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { useDispatch, useSelector  } from "react-redux";
import { loginUser, getUsersStatus, getUsersError } from '../../redux/userSlice';

import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import Divider from '@mui/material/Divider';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const userStatus = useSelector(getUsersStatus);
  const userError = useSelector(getUsersError);
  // New feature
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState([]);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(loginUser({ ...values })).unwrap()
    .then((originalPromiseResult) => {
      // handle result here
      console.log(originalPromiseResult)
      navigate("/");
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
      console.log(rejectedValueOrSerializedError)
      setApiError(rejectedValueOrSerializedError)
      setLoading(false)
    })
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth">
      <form>
        <h1 className="authH1">Login</h1>

        {(userStatus === 'failed') && (
          <h2 className="authH2">{apiError.message}!</h2>
        )}

        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <LoadingButton
        size="small"
        color="success"
        onClick={handleClick}
        loading={loading}
        loadingPosition="start"
        startIcon={<LoginIcon />}
        variant="contained">
        Login
        </LoadingButton>
        <label className="authLabel">Don't have an account? <Link to="/Register">Register</Link></label>
        <Divider />
      </form>
    </div>
  );
};

export default Login;
