import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, isAuthenticated, updateUserProfile } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
    }, [isAuthenticated, navigate]);

    const [formData, setFormData] = useState({
        FirstName: user?.FirstName || '',
        LastName: user?.LastName || '',
        Email: user?.Email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.bio || '',
        profileImage: user?.profileImage || ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setFormData(prev => ({
                ...prev,
                profileImage: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'profileImage' && selectedImage) {
                    formDataToSend.append('profileImage', selectedImage);
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const response = await axios.put('/users/update', formDataToSend, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                // Update the user data in the auth context
                await updateUserProfile(response.data.user);
                toast.success('Profile updated successfully');
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Profile update error:', error);
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br mt-[100px] from-gray-50 via-white to-gray-100 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Image and Basic Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl overflow-hidden transform transition-all duration-300">
                            <div className="relative h-40 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
                                <div className="absolute -bottom-16 inset-x-0 flex justify-center">
                                    <div className="relative">
                                        {formData.profileImage ? (
                                            <img
                                                src={formData.profileImage}
                                                alt="Profile"
                                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transform transition-all duration-300 hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center transform transition-all duration-300 hover:scale-105">
                                                <FaUser className="w-16 h-16 text-gray-400" />
                                            </div>
                                        )}
                                        {isEditing && (
                                            <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-20 pb-6 px-6 text-center">
                                <h2 className="text-2xl font-bold text-gray-900">{user?.FirstName} {user?.LastName}</h2>
                                <p className="text-gray-600 mt-1">{user?.Email}</p>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                                >
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Profile Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-6 sm:p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="FirstName"
                                            value={formData.FirstName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="LastName"
                                            value={formData.LastName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="Email"
                                            value={formData.Email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>

                                    <div className="sm:col-span-2 space-y-1">
                                        <label className="text-sm font-medium text-gray-700">Bio</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            rows={4}
                                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500"
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;