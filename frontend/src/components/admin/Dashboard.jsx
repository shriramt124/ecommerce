import React from 'react';
import { FiUsers, FiPackage, FiDollarSign, FiShoppingBag, FiHome, FiSettings } from 'react-icons/fi';

const Dashboard = () => {
    const stats = {
        totalUsers: 156,
        activeUsers: 89,
        totalProducts: 48,
        totalOrders: 1234,
        revenue: 45600
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar - Vertical on md+ screens, Bottom on small screens */}
            <aside className="fixed md:inset-y-0 md:left-0 md:w-20 lg:w-64 md:h-screen 
                              bottom-0 left-0 right-0 h-20 w-full
                              z-40 bg-white shadow-lg transition-all duration-300 ease-in-out">
                {/* Desktop/Tablet Logo - Hidden on mobile */}
                <div className="p-4 lg:p-6 hidden md:block lg:block">
                    <h2 className="text-2xl font-serif hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">Admin Panel</h2>

                    {/* Tablet Logo */}
                    <div className="flex justify-center items-center h-10 lg:hidden">
                        <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                            <span className="text-white text-lg font-bold">A</span>
                        </div>
                    </div>
                </div>

                {/* Navigation - Vertical on md+ screens, Horizontal on small screens */}
                <nav className="md:mt-6 md:px-2 md:py-0 w-full h-full">
                    {/* Mobile (horizontal scrollable) navigation */}
                    <div className="flex md:flex-col md:space-y-2 md:space-x-0 
                                  space-x-4 overflow-x-auto px-4 py-3 
                                  items-center justify-center md:justify-start
                                  h-full md:h-auto">
                        <button className="flex-shrink-0 flex items-center justify-center md:justify-start w-12 h-12 md:w-full md:h-auto px-0 md:px-3 py-2 text-gray-600 
                                          hover:bg-black hover:text-white rounded-lg transition-all duration-200 group">
                            <FiHome className="h-6 w-6" />
                            <span className="ml-3 hidden lg:inline-block">Dashboard</span>
                        </button>
                        <button className="flex-shrink-0 flex items-center justify-center md:justify-start w-12 h-12 md:w-full md:h-auto px-0 md:px-3 py-2 text-gray-600 
                                          hover:bg-black hover:text-white rounded-lg transition-all duration-200 group">
                            <FiUsers className="h-6 w-6" />
                            <span className="ml-3 hidden lg:inline-block">Users</span>
                        </button>
                        <button className="flex-shrink-0 flex items-center justify-center md:justify-start w-12 h-12 md:w-full md:h-auto px-0 md:px-3 py-2 text-gray-600 
                                          hover:bg-black hover:text-white rounded-lg transition-all duration-200 group">
                            <FiPackage className="h-6 w-6" />
                            <span className="ml-3 hidden lg:inline-block">Products</span>
                        </button>
                        <button className="flex-shrink-0 flex items-center justify-center md:justify-start w-12 h-12 md:w-full md:h-auto px-0 md:px-3 py-2 text-gray-600 
                                          hover:bg-black hover:text-white rounded-lg transition-all duration-200 group">
                            <FiShoppingBag className="h-6 w-6" />
                            <span className="ml-3 hidden lg:inline-block">Orders</span>
                        </button>
                        <button className="flex-shrink-0 flex items-center justify-center md:justify-start w-12 h-12 md:w-full md:h-auto px-0 md:px-3 py-2 text-gray-600 
                                          hover:bg-black hover:text-white rounded-lg transition-all duration-200 group">
                            <FiSettings className="h-6 w-6" />
                            <span className="ml-3 hidden lg:inline-block">Settings</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content - Adjust padding for bottom nav on mobile */}
            <main className="md:ml-20 lg:ml-64 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 transition-all duration-300">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        {/* Total Users Card */}
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 border-t-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                                    <p className="text-xl sm:text-2xl font-semibold mt-2">{stats.totalUsers}</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <FiUsers className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs sm:text-sm">
                                <span className="text-green-500 font-medium">{stats.activeUsers} active</span>
                                <span className="mx-2 text-gray-600">•</span>
                                <span className="text-gray-600">{stats.totalUsers - stats.activeUsers} inactive</span>
                            </div>
                        </div>
                        {/* Total Products Card */}
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 border-t-4 border-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                                    <p className="text-xl sm:text-2xl font-semibold mt-2">{stats.totalProducts}</p>
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
                        {/* Total Orders Card */}
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 border-t-4 border-yellow-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-xl sm:text-2xl font-semibold mt-2">{stats.totalOrders}</p>
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
                        {/* Revenue Card */}
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 border-t-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                    <p className="text-xl sm:text-2xl font-semibold mt-2">₹{stats.revenue.toLocaleString()}</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <FiDollarSign className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs sm:text-sm">
                                <span className="text-green-500 font-medium">+12.5%</span>
                                <span className="mx-2 text-gray-600">•</span>
                                <span className="text-gray-600">from last month</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
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

                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
                            <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Quick Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Conversion Rate</span>
                                    <span className="text-sm font-medium">3.6%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full w-4/12"></div>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm text-gray-600">Retention Rate</span>
                                    <span className="text-sm font-medium">78%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full w-9/12"></div>
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-sm text-gray-600">Cart Abandonment</span>
                                    <span className="text-sm font-medium">22%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full w-2/12"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;