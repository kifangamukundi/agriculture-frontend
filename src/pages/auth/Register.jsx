import { useState } from "react";
import FormInput from "./FormInput";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser, getUsersStatus, getUsersError } from '../../redux/userSlice';

import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import Divider from '@mui/material/Divider';

const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const userStatus = useSelector(getUsersStatus);
  const userError = useSelector(getUsersError);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState([]);

  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "First should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last should be 3-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
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
      id: 5,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(addNewUser({ ...values })).unwrap()
    .then((originalPromiseResult) => {
      // handle result here
      console.log(originalPromiseResult)
      navigate("/Login");
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
        <h1 className="authH1">Register</h1>

        {(userStatus === 'failed') && (
          <h2 className="authH2">({userError}) {apiError.message}!</h2>
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
        onClick={handleSubmit}
        loading={loading}
        loadingPosition="start"
        startIcon={<LoginIcon />}
        variant="contained">
        Register
        </LoadingButton>
        <label className="authLabel">Have an account? <Link to="/Login">Login</Link></label>
        <Divider />
      </form>
    </div>
  );
};

export default Register;