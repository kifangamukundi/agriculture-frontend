import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls/userCalls";
import { Link, useNavigate } from "react-router-dom";
import "../layout/auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    navigate("/");
  };

  return (
    <div className="auth">
      <form onSubmit={handleClick}>
        <h1 className="formh1">Login</h1>
        <div className="formInput">
          <label className="formlabel">Username</label>
          <input
            name="username"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            className="forminput"
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="forminput"
          />
        </div>
        <button className="formbutton">Login</button>
      </form>
    </div>
  );
};

export default Login;
