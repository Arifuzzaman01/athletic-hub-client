import React from 'react';
import { Link } from 'react-router';
import { motion } from "motion/react";

const Error = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-9xl font-bold text-red-500 mb-4"
                >
                    404
                </motion.div>
                
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold text-gray-800 mb-4"
                >
                    Page Not Found
                </motion.h1>
                
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600 mb-8"
                >
                    Oops! The page you're looking for doesn't exist or has been moved.
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <Link 
                        to="/" 
                        className="btn bg-red-500 hover:bg-red-600 text-white px-6 py-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Back to Home
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Error;