import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTicketAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-gray-900/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">

                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="text-white text-2xl font-bold flex items-center gap-2 group"
                    >
                        <FaTicketAlt className="text-purple-400 group-hover:rotate-12 transition duration-300" />
                        <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                            Eventora
                        </span>
                    </Link>

                    {/* Links */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">

                        {/* Events */}
                        <Link 
                            to="/" 
                            className={`relative font-medium transition duration-300 ${
                                isActive('/') ? 'text-white' : 'text-gray-300 hover:text-white'
                            }`}
                        >
                            Events
                            <span className={`absolute left-0 -bottom-1 h-[2px] w-full bg-purple-400 transition-transform duration-300 ${
                                isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            } origin-left`} />
                        </Link>

                        {user ? (
                            <>
                                {/* Dashboard */}
                                <Link 
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                                    className={`relative font-medium transition duration-300 ${
                                        location.pathname.includes('dashboard') || location.pathname.includes('admin')
                                            ? 'text-white'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    Dashboard
                                </Link>

                                {/* Logout */}
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 hover:shadow-md text-white px-4 py-2 rounded-md transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className={`font-medium transition duration-300 ${
                                        isActive('/login') ? 'text-white' : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    Login
                                </Link>

                                <Link 
                                    to="/register" 
                                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 hover:shadow-md text-white px-4 py-2 rounded-md font-semibold transition duration-300"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;