import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/Navbar';
import Loader from '../component/Loader';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Loader></Loader>
        </div>
    );
};

export default MainLayout;