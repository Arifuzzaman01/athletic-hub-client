import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/Navbar';
import Loader from '../component/Loader';
import Footer from '../component/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='bg-base-200'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;