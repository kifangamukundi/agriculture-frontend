import { Link, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./topbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiCalls/userCalls";

export default function Topbar() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.currentUser);

  const handleSignOut = () => {
    console.log("I was Called on click")
    logout(dispatch);
    navigate("/Login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Agri-Biz</span>
        </div>
        <div className="topRight">

          <div className="topbarIconContainer">
            <Tooltip title="Logout">
              <IconButton onClick={handleSignOut}>
                <LogoutIcon color="action"/>
              </IconButton>
            </Tooltip>
          </div>

          <div className="topbarIconContainer">
            <Link to={"/ViewProfile/" + user.id}>
              <Tooltip title="Profile">
                <IconButton>
                  <AccountCircleIcon color="action"/>
                </IconButton>
              </Tooltip>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
