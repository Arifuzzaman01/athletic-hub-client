import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/Navbar';
import Loader from '../component/Loader';
import Footer from '../component/Footer';
import PageTitle from '../component/PageTitle';

const MainLayout = () => {
    return (
        <div>
            
            <Navbar></Navbar>
            <div className='bg-base-200'>
                <PageTitle></PageTitle>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;