import { Outlet } from 'react-router-dom';
import Topbar from '../topbar/Topbar';
import Sidebar from '../sidebar/Sidebar';

const Layout = () => (
    <>
        <Topbar />
        <div className="container">
            <Sidebar />
            <Outlet />
        </div>
    </>
);

export default Layout;