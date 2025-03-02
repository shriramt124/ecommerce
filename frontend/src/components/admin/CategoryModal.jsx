import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const CategoryModal = ({ isOpen, onClose, category, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: category?.name || '',
        slug: category?.slug || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            slug: name === 'name' ? value.toLowerCase().replace(/\s+/g, '-') : prev.slug
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="flex items-center justify-center min-h-screen px-4 py-8 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full scale-95 sm:scale-100">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                                {category ? 'Edit Category' : 'Create New Category'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                            >
                                <FiX className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    minLength={3}
                                    className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
                                <input
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200 bg-gray-50"
                                    readOnly
                                />
                            </div>

                            <div className="mt-5 sm:mt-6 flex space-x-3">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center w-full rounded-lg border border-transparent shadow-sm px-6 py-3 bg-black text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    {category ? 'Update Category' : 'Create Category'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="inline-flex justify-center w-full rounded-lg border border-gray-300 shadow-sm px-6 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;