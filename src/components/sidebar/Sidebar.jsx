import "./sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PaidIcon from '@mui/icons-material/Paid';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PushPinIcon from '@mui/icons-material/PushPin';
import FlagIcon from '@mui/icons-material/Flag';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CollectionsIcon from '@mui/icons-material/Collections';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MessageIcon from '@mui/icons-material/Message';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
              {/* I removed the active class below */}
            <Link to="/Dashboard" className="link">
            <li className="sidebarListItem">
              <HomeIcon className="sidebarIcon" color="action" />
              Dashboard
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Admin Actions</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem">
              <PeopleIcon className="sidebarIcon" color="action" />
              Manage Users
            </li>
            </Link>
            <li className="sidebarListItem">
              <AnalyticsIcon className="sidebarIcon" color="action" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <PaidIcon className="sidebarIcon" color="action" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/ProductList" className="link">
              <li className="sidebarListItem">
                <ProductionQuantityLimitsIcon className="sidebarIcon" color="action" />
                Products
              </li>
            </Link>

            <Link to="/CategoryList" className="link">
              <li className="sidebarListItem">
                <CategoryIcon className="sidebarIcon" color="action" />
                Categories
              </li>
            </Link>
            <Link to="/CategoryList" className="link">
              <li className="sidebarListItem">
                <LocationOnIcon className="sidebarIcon" color="action" />
                Collection Locations
              </li>
            </Link>
            <Link to="/CategoryList" className="link">
              <li className="sidebarListItem">
                <PushPinIcon className="sidebarIcon" color="action" />
                Collection Centers
              </li>
            </Link>
            <Link to="/CategoryList" className="link">
              <li className="sidebarListItem">
              <FlagIcon className="sidebarIcon" color="action" />
                Counties
              </li>
            </Link>
            <Link to="/CategoryList" className="link">
              <li className="sidebarListItem">
              <LocationCityIcon className="sidebarIcon" color="action" />
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
              <CollectionsIcon className="sidebarIcon" color="action" />
                Produce
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
              <TimelineIcon className="sidebarIcon" color="action" />
                Progress
              </li>
            </Link>
            
            <li className="sidebarListItem">
            <AssessmentIcon className="sidebarIcon" color="action" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
            <MessageIcon className="sidebarIcon" color="action" />
              Messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
