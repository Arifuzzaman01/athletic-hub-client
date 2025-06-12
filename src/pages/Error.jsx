import React from 'react';
import errorImg from '../assets/error.jpg'
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div>
                <img src={errorImg} alt="" />
                <Link to='/' className='btn btn-primary'>Go to Home</Link>
            </div>
        </div>
    );
};

export default Error;