import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { useDispatch, useSelector  } from "react-redux";
import { loginUser, getUserError, getUserStatus } from '../../redux/userSlice';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const userStatus = useSelector(getUserStatus);
  const userError = useSelector(getUserError);
  // New feature
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

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
    dispatch(loginUser({ ...values }))
    .then(data => {
      // do something with data
      console.log("I was called")
      navigate("/")
    })
    .catch(error => {
     // do something with error
     console.log("I was called")
     navigate("/Login")
    })
    .finally(() => {
      console.log("finally called")
    })
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth">
      <form onSubmit={handleClick}>
        <h1 className="authH1">Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {userStatus === 'loading' ? <CircularProgress /> : <button className="authButton">Submit</button>}
        {userStatus === 'failed' && <div className="error">{userError}</div>}
        <label className="authLabel">Don't have an account? <Link to="/Register">Register</Link></label>
      </form>
    </div>
  );
};

export default Login;
