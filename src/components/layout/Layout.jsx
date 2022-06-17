import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import Topbar from '../topbar/Topbar';
import Sidebar from '../sidebar/Sidebar';

const Layout = () => (
    <Fragment>
        <Topbar />
        <div className="container">
            <Sidebar />
            <Outlet />
        </div>
    </Fragment>
);

export default Layout;