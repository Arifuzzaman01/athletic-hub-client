import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/Navbar';
import Loader from '../component/Loader';
import Footer from '../component/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;