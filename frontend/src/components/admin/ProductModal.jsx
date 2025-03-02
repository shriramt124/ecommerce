import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiX } from 'react-icons/fi';
import { fetchCategories } from '../../store/features/categorySlice';

const ProductModal = ({ isOpen, onClose, product, onSubmit }) => {
    const dispatch = useDispatch();
    const { items: categories, loading: categoriesLoading } = useSelector((state) => state.categories);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        images: []
    });

    useEffect(() => {
        dispatch(fetchCategories());
        if (product) {
            setFormData({
                title: product.title || '',
                description: product.description || '',
                price: product.price || '',
                quantity: product.quantity || '',
                category: product.category?._id || '',
                images: product.images || []
            });
        } else {
            setFormData({
                title: '',
                description: '',
                price: '',
                quantity: '',
                category: '',
                images: []
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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
                                {product ? 'Edit Product' : 'Create New Product'}
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
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    minLength={3}
                                    className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    minLength={10}
                                    maxLength={500}
                                    rows={3}
                                    className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Images</label>
                                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors duration-200">
                                    <div className="space-y-1 text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="images"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
                                            >
                                                <span>Upload files</span>
                                                <input
                                                    id="images"
                                                    name="images"
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    className="sr-only"
                                                    onChange={(e) => {
                                                        // TODO: Handle image upload
                                                        console.log(e.target.files);
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6 flex space-x-3">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center w-full rounded-lg border border-transparent shadow-sm px-6 py-3 bg-black text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black sm:text-sm transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    {product ? 'Update Product' : 'Create Product'}
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

export default ProductModal;