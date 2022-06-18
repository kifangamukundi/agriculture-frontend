import "./sidebar.css";
import {
  Home,
  People,
  MonetizationOn,
  AddLocation,
  Map,
  Flag,
  GpsFixed,
  LocalFlorist,
  Autorenew,
  Assessment,
  Message,
  Timeline,
  Storefront,
  Category,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
              {/* I removed the active class below */}
            <Link to="/" className="link">
            <li className="sidebarListItem">
              <Home className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Admin Actions</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem">
              <People className="sidebarIcon" />
              Manage Users
            </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <MonetizationOn className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/ProductList" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>

            <Link to="/CategoryList" className="link">
              <li className="sidebarListItem">
                <Category className="sidebarIcon" />
                Categories
              </li>
            </Link>
            <Link to="/CategoryList" className="link">
              <li className="sidebarListItem">
                <AddLocation className="sidebarIcon" />
                Collection Locations
              </li>
            </Link>
            <Link to="/CategoryList" className="link">
              <li className="sidebarListItem">
                <Map className="sidebarIcon" />
                Collection Centers
              </li>
            </Link>
            <Link to="/CategoryList" className="link">
              <li className="sidebarListItem">
                <Flag className="sidebarIcon" />
                Counties
              </li>
            </Link>
            <Link to="/CategoryList" className="link">
              <li className="sidebarListItem">
                <GpsFixed className="sidebarIcon" />
                County Places
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">User Actions</h3>
          <ul className="sidebarList">

            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <LocalFlorist className="sidebarIcon" />
                Produce
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <Autorenew className="sidebarIcon" />
                Progress
              </li>
            </Link>
            
            <li className="sidebarListItem">
              <Assessment className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Message className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
