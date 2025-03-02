import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiMoreVertical, FiUser } from 'react-icons/fi';

const UsersPanel = () => {
    const { users, loading } = useSelector((state) => state.admin);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleBlockUser = (userId) => {
        // TODO: Implement block user functionality
        console.log('Block user:', userId);
        setActiveDropdown(null);
    };

    const handleUnblockUser = (userId) => {
        // TODO: Implement unblock user functionality
        console.log('Unblock user:', userId);
        setActiveDropdown(null);
    };

    const toggleDropdown = (userId) => {
        setActiveDropdown(activeDropdown === userId ? null : userId);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">User Management</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Manage and monitor user accounts</p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th scope="col" className="relative px-4 sm:px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users?.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-xl font-medium text-gray-600">
                                                    {user.FirstName?.[0]}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.FirstName} {user.LastName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 truncate max-w-[200px]">{user.Email}</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.isBlocked ? 'Blocked' : 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleDropdown(user._id)}
                                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                            >
                                                <FiMoreVertical className="h-5 w-5" />
                                            </button>
                                            {activeDropdown === user._id && (
                                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                                    <div className="py-1" role="menu">
                                                        {user.isBlocked ? (
                                                            <button
                                                                onClick={() => handleUnblockUser(user._id)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                role="menuitem"
                                                            >
                                                                Unblock User
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleBlockUser(user._id)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                                role="menuitem"
                                                            >
                                                                Block User
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-4">
                {users?.map((user) => (
                    <div key={user._id} className="bg-white rounded-lg shadow-sm p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-xl font-medium text-gray-600">
                                        {user.FirstName?.[0]}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{user.FirstName} {user.LastName}</div>
                                    <div className="text-sm text-gray-500 break-all">{user.Email}</div>
                                </div>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown(user._id)}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <FiMoreVertical className="h-5 w-5 text-gray-400" />
                                </button>
                                {activeDropdown === user._id && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                        <div className="py-1" role="menu">
                                            {user.isBlocked ? (
                                                <button
                                                    onClick={() => handleUnblockUser(user._id)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    Unblock User
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleBlockUser(user._id)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                    role="menuitem"
                                                >
                                                    Block User
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {user.isBlocked ? 'Blocked' : 'Active'}
                            </span>
                            <span className="text-gray-500">
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersPanel;