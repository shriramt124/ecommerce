import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiUsers, FiPackage, FiDollarSign, FiShoppingBag, FiHome, FiList } from 'react-icons/fi';
import { fetchDashboardStats, fetchAllUsers } from '../../store/features/adminSlice';
import UsersPanel from './UsersPanel';
import ProductsPanel from './ProductsPanel';
import CategoriesPanel from './CategoriesPanel';
const Dashboard = () => {
    const dispatch = useDispatch();
    const { stats, loading, error } = useSelector((state) => state.admin);
    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        dispatch(fetchDashboardStats());
        dispatch(fetchAllUsers());
    }, [dispatch]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">
            {error}
        </div>;
    }

    const {
        totalUsers = 0,
        activeUsers = 0,
        totalProducts = 0,
        totalOrders = 0
    } = stats || {};

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <UsersPanel />;
            case 'products':
                return <ProductsPanel />;
            case 'categories':
                return <CategoriesPanel />;
            default:
                return (
                    <div className="container mx-auto">
                        <div className="mb-6 sm:mb-8">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 border-t-4 border-blue-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                                        <p className="text-xl sm:text-2xl font-semibold mt-2">{totalUsers}</p>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <FiUsers className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-xs sm:text-sm">
                                    <span className="text-green-500 font-medium">{activeUsers} active</span>
                                    <span className="mx-2 text-gray-600">•</span>
                                    <span className="text-gray-600">{totalUsers - activeUsers} inactive</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 border-t-4 border-purple-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Products</p>
                                        <p className="text-xl sm:text-2xl font-semibold mt-2">{totalProducts}</p>
                                    </div>
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <FiPackage className="h-6 w-6 text-purple-600" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-xs sm:text-sm">
                                    <span className="text-green-500 font-medium">12 new</span>
                                    <span className="mx-2 text-gray-600">•</span>
                                    <span className="text-gray-600">this week</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 border-t-4 border-yellow-500">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                        <p className="text-xl sm:text-2xl font-semibold mt-2">{totalOrders}</p>
                                    </div>
                                    <div className="bg-yellow-100 p-3 rounded-lg">
                                        <FiShoppingBag className="h-6 w-6 text-yellow-600" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-xs sm:text-sm">
                                    <span className="text-green-500 font-medium">89 new</span>
                                    <span className="mx-2 text-gray-600">•</span>
                                    <span className="text-gray-600">this month</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6 flex items-center">
                                <span>Recent Activity</span>
                                <span className="ml-2 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Today</span>
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <FiUsers className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">New user registered</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                        <FiShoppingBag className="h-5 w-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">New order placed #2584</p>
                                        <p className="text-xs text-gray-500">3 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                        <FiPackage className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Product updated: Wireless Headphones</p>
                                        <p className="text-xs text-gray-500">5 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <aside className="fixed md:inset-y-0 md:left-0 md:w-20 lg:w-64 md:h-screen bottom-0 left-0 right-0 h-20 w-full z-40 bg-white shadow-lg transition-all duration-300 ease-in-out">
                <div className="p-4 lg:p-6 hidden md:block lg:block">
                    <h2 className="text-2xl font-serif hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Admin Panel</h2>
                    <div className="flex justify-center items-center h-10 lg:hidden">
                        <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                            <span className="text-white text-lg font-bold">A</span>
                        </div>
                    </div>
                </div>

                <nav className="md:mt-6 md:px-2 md:py-0 w-full h-full">
                    <div className="flex md:flex-col md:space-y-2 md:space-x-0 space-x-4 overflow-x-auto px-4 py-3 items-center justify-center md:justify-start h-full md:h-auto">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`flex-shrink-0 flex items-center justify-center md:justify-start w-12 h-12 md:w-full md:h-auto px-0 md:px-3 py-2 rounded-lg transition-all duration-200 group ${activeTab === 'dashboard' ? 'bg-black text-white' : 'text-gray-600 hover:bg-black hover:text-white'}`}
                        >
                            <FiHome className="h-6 w-6" />
                            <span className="ml-3 hidden lg:inline-block">Dashboard</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`flex-shrink-0 flex items-center justify-center md:justify-start w-12 h-12 md:w-full md:h-auto px-0 md:px-3 py-2 rounded-lg transition-all duration-200 group ${activeTab === 'users' ? 'bg-black text-white' : 'text-gray-600 hover:bg-black hover:text-white'}`}
                        >
                            <FiUsers className="h-6 w-6" />
                            <span className="ml-3 hidden lg:inline-block">Users</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`flex-shrink-0 flex items-center justify-center md:justify-start w-12 h-12 md:w-full md:h-auto px-0 md:px-3 py-2 rounded-lg transition-all duration-200 group ${activeTab === 'products' ? 'bg-black text-white' : 'text-gray-600 hover:bg-black hover:text-white'}`}
                        >
                            <FiPackage className="h-6 w-6" />
                            <span className="ml-3 hidden lg:inline-block">Products</span>
                        </button>
                        <button className="flex-shrink-0 flex items-center justify-center md:justify-start w-12 h-12 md:w-full md:h-auto px-0 md:px-3 py-2 text-gray-600 hover:bg-black hover:text-white rounded-lg transition-all duration-200 group">
                            <FiShoppingBag className="h-6 w-6" />
                            <span className="ml-3 hidden lg:inline-block">Orders</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('categories')}
                            className={`flex-shrink-0 flex items-center justify-center md:justify-start w-12 h-12 md:w-full md:h-auto px-0 md:px-3 py-2 rounded-lg transition-all duration-200 group ${activeTab === 'categories' ? 'bg-black text-white' : 'text-gray-600 hover:bg-black hover:text-white'}`}
                        >
                            <FiList className="h-6 w-6" />
                            <span className="ml-3 hidden lg:inline-block">Categories</span>
                        </button>
                    </div>
                </nav>
            </aside>

            <main className="md:ml-20 lg:ml-64 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 transition-all duration-300">
                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;