import React from 'react';
import { FiUsers, FiPackage, FiDollarSign, FiShoppingBag } from 'react-icons/fi';

const Dashboard = () => {
    const stats = {
        totalUsers: 156,
        activeUsers: 89,
        totalProducts: 48,
        totalOrders: 1234,
        revenue: 45600
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed md:left-0 md:top-0 md:h-screen md:w-16 lg:w-64 transition-transform duration-300 ease-in-out z-40 bg-white shadow-lg
                            bottom-0 left-0 right-0 h-16 md:bottom-auto">
                <div className="p-6 hidden lg:block">
                    <h2 className="text-2xl font-serif">Admin Panel</h2>
                </div>
                <nav className="flex md:flex-col md:mt-6 overflow-x-auto md:overflow-visible scrollbar-hide">
                    <div className="flex md:flex-col w-full justify-around md:justify-start md:space-y-2 px-4">
                        <button className="flex items-center justify-center lg:justify-start w-full px-4 py-3 text-gray-600 
                                          hover:bg-black hover:text-white rounded-lg transition-all duration-200 group">
                            <FiUsers className="h-5 w-5" />
                            <span className="ml-3 hidden lg:inline-block">Users</span>
                        </button>
                        <button className="flex items-center justify-center lg:justify-start w-full px-4 py-3 text-gray-600 
                                          hover:bg-black hover:text-white rounded-lg transition-all duration-200 group">
                            <FiPackage className="h-5 w-5" />
                            <span className="ml-3 hidden lg:inline-block">Products</span>
                        </button>
                        <button className="flex items-center justify-center lg:justify-start w-full px-4 py-3 text-gray-600 
                                          hover:bg-black hover:text-white rounded-lg transition-all duration-200 group">
                            <FiShoppingBag className="h-5 w-5" />
                            <span className="ml-3 hidden lg:inline-block">Orders</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="md:ml-16 lg:ml-64 p-4 sm:p-6 lg:p-8">
                <div className="container mx-auto">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        {/* Total Users Card */}
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                                    <p className="text-xl sm:text-2xl font-semibold mt-2">{stats.totalUsers}</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <FiUsers className="h-5 sm:h-6 w-5 sm:w-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs sm:text-sm">
                                <span className="text-green-500 font-medium">{stats.activeUsers} active</span>
                                <span className="mx-2 text-gray-600">•</span>
                                <span className="text-gray-600">{stats.totalUsers - stats.activeUsers} inactive</span>
                            </div>
                        </div>
                        {/* Total Products Card */}
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                                    <p className="text-xl sm:text-2xl font-semibold mt-2">{stats.totalProducts}</p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <FiPackage className="h-5 sm:h-6 w-5 sm:w-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs sm:text-sm">
                                <span className="text-green-500 font-medium">12 new</span>
                                <span className="mx-2 text-gray-600">•</span>
                                <span className="text-gray-600">this week</span>
                            </div>
                        </div>
                        {/* Total Orders Card */}
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-xl sm:text-2xl font-semibold mt-2">{stats.totalOrders}</p>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-lg">
                                    <FiShoppingBag className="h-5 sm:h-6 w-5 sm:w-6 text-yellow-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-xs sm:text-sm">
                                <span className="text-green-500 font-medium">89 new</span>
                                <span className="mx-2 text-gray-600">•</span>
                                <span className="text-gray-600">this month</span>
                            </div>
                        </div>
                        {/* Revenue Card */}
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                                    <p className="text-xl sm:text-2xl font-semibold mt-2">₹{stats.revenue.toLocaleString()}</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <FiDollarSign className="h-5 sm:h-6 w-5 sm:w-6 text-green-600" />
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
                    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                        <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Recent Activity</h3>
                        <div className="space-y-4 sm:space-y-6">
                            <p className="text-sm sm:text-base text-gray-600">No recent activity</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;