import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { fetchCategories } from '../../store/features/categorySlice';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ProductModal = ({ isOpen, onClose, product, onSubmit }) => {
    const dispatch = useDispatch();
    const { items: categories, loading: categoriesLoading } = useSelector((state) => state.categories);
    // Update the initial formData state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        images: [],
        video: '',
        keyFeatures: [{ feature: '' }],
        faq: [{ question: '', answer: '' }],
        isNewArrival: false,
        isInCollection: false,
        isCarouselImage: false,
        collectionType: 'New',
        releaseDate: new Date().toISOString().split('T')[0]
    });
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchCategories());
        };
        fetchData();
        return () => {
            // Cleanup effect
            setFormData({
                title: '',
                description: '',
                price: '',
                quantity: '',
                category: '',
                images: [],
                video: '',
                keyFeatures: [{ feature: '' }],
                faq: [{ question: '', answer: '' }]
            });
            setImageFiles([]);
        };
    }, [dispatch]);

    // Update the useEffect for product data
    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title || '',
                description: product.description || '',
                price: product.price || '',
                quantity: product.quantity || '',
                category: product.category?._id || '',
                images: product.images || [],
                video: product.video || '',
                keyFeatures: product.keyFeatures?.length ? product.keyFeatures : [{ feature: '' }],
                faq: product.faq?.length ? product.faq : [{ question: '', answer: '' }],
                isNewArrival: product.isNewArrival || false,
                isInCollection: product.isInCollection || false,
                isCarouselImage: product.isCarouselImage || false,
                collectionType: product.collectionType || 'New',
                releaseDate: product.releaseDate ? new Date(product.releaseDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            });
            setImageFiles([]);
        } else {
            setFormData({
                title: '',
                description: '',
                price: '',
                quantity: '',
                category: '',
                images: [],
                video: '',
                keyFeatures: [{ feature: '' }],
                faq: [{ question: '', answer: '' }],
                isNewArrival: false,
                isInCollection: false,
                collectionType: 'New',
                releaseDate: new Date().toISOString().split('T')[0]
            });
            setImageFiles([]);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files);
    };

    const handleKeyFeatureChange = (index, value) => {
        const newKeyFeatures = [...formData.keyFeatures];
        newKeyFeatures[index].feature = value;
        setFormData(prev => ({ ...prev, keyFeatures: newKeyFeatures }));
    };

    const handleAddKeyFeature = () => {
        setFormData(prev => ({
            ...prev,
            keyFeatures: [...prev.keyFeatures, { feature: '' }]
        }));
    };

    const handleRemoveKeyFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
        }));
    };

    const handleFAQChange = (index, field, value) => {
        const newFAQ = [...formData.faq];
        newFAQ[index][field] = value;
        setFormData(prev => ({ ...prev, faq: newFAQ }));
    };

    const handleAddFAQ = () => {
        setFormData(prev => ({
            ...prev,
            faq: [...prev.faq, { question: '', answer: '' }]
        }));
    };

    const handleRemoveFAQ = (index) => {
        setFormData(prev => ({
            ...prev,
            faq: prev.faq.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productFormData = new FormData();

        // Append text fields
        productFormData.append('title', formData.title);
        productFormData.append('description', formData.description);
        productFormData.append('price', formData.price);
        productFormData.append('quantity', formData.quantity);
        productFormData.append('category', formData.category);
        productFormData.append('video', formData.video);
        productFormData.append('keyFeatures', JSON.stringify(formData.keyFeatures));
        productFormData.append('faq', JSON.stringify(formData.faq));
        productFormData.append('isNewArrival', formData.isNewArrival);
        productFormData.append('isInCollection', formData.isInCollection);
        productFormData.append('isCarouselImage', formData.isCarouselImage);
        productFormData.append('collectionType', formData.collectionType);
        productFormData.append('releaseDate', formData.releaseDate);

        // Append image files
        imageFiles.forEach(file => {
            productFormData.append('images', file);
        });

        onSubmit(productFormData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500/50 bg-opacity-75 transition-opacity">
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <div className="inline-block w-full transform overflow-hidden rounded-t-xl sm:rounded-xl bg-white text-left align-bottom shadow-2xl transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 max-h-[85vh] overflow-y-auto">
                        <div className="sm:flex sm:items-start mb-4 sm:mb-6">
                            <div className="w-full">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">
                                        {product ? 'Edit Product' : 'Create New Product'}
                                    </h3>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
                                    >
                                        <FiX className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </button>
                                </div>
                            </div>
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
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="isNewArrival"
                                        name="isNewArrival"
                                        checked={formData.isNewArrival}
                                        onChange={(e) => setFormData(prev => ({ ...prev, isNewArrival: e.target.checked }))}
                                        className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                                    />
                                    <label htmlFor="isNewArrival" className="text-sm font-medium text-gray-700">New Arrival</label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="isInCollection"
                                        name="isInCollection"
                                        checked={formData.isInCollection}
                                        onChange={(e) => setFormData(prev => ({ ...prev, isInCollection: e.target.checked }))}
                                        className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                                    />
                                    <label htmlFor="isInCollection" className="text-sm font-medium text-gray-700">In Collection</label>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="isCarouselImage"
                                    name="isCarouselImage"
                                    checked={formData.isCarouselImage}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isCarouselImage: e.target.checked }))}
                                    className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                                />
                                <label htmlFor="isCarouselImage" className="text-sm font-medium text-gray-700">Show in Carousel</label>
                            </div>

                            <div>
                                <label htmlFor="collectionType" className="block text-sm font-medium text-gray-700">Collection Type</label>
                                <select
                                    id="collectionType"
                                    name="collectionType"
                                    value={formData.collectionType}
                                    onChange={handleChange}
                                    className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                                >
                                    <option value="New">New</option>
                                    <option value="Limited">Limited</option>
                                    <option value="Bestseller">Bestseller</option>
                                </select>
                            </div>

                            {/* Key Features Section */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium text-gray-700">Key Features</label>
                                    <button
                                        type="button"
                                        onClick={handleAddKeyFeature}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                    >
                                        <FiPlus className="-ml-1 mr-2 h-4 w-4" />
                                        Add Feature
                                    </button>
                                </div>
                                {formData.keyFeatures.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={feature.feature}
                                            onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                                            placeholder="Enter a key feature"
                                            className="flex-1 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                                            required
                                        />
                                        {formData.keyFeatures.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveKeyFeature(index)}
                                                className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                                            >
                                                <FiTrash2 className="h-5 w-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* FAQ Section */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium text-gray-700">FAQ</label>
                                    <button
                                        type="button"
                                        onClick={handleAddFAQ}
                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                    >
                                        <FiPlus className="-ml-1 mr-2 h-4 w-4" />
                                        Add FAQ
                                    </button>
                                </div>
                                {formData.faq.map((faq, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    value={faq.question}
                                                    onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                                                    placeholder="Question"
                                                    className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                                                    required
                                                />
                                                <textarea
                                                    value={faq.answer}
                                                    onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                                                    placeholder="Answer"
                                                    rows={2}
                                                    className="w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                                                    required
                                                />
                                                {formData.faq.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveFAQ(index)}
                                                        className="p-2 text-red-600 hover:text-red-800 focus:outline-none self-start"
                                                    >
                                                        <FiTrash2 className="h-5 w-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                                <label htmlFor="video" className="block text-sm font-medium text-gray-700">Video URL</label>
                                <input
                                    type="url"
                                    id="video"
                                    name="video"
                                    value={formData.video}
                                    onChange={handleChange}
                                    placeholder="Enter video URL (optional)"
                                    className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors duration-200"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Images</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-2 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-black file:text-white
                                    hover:file:bg-gray-800"
                                />
                                {formData.images.length > 0 && (
                                    <div className="mt-2 grid grid-cols-3 gap-2">
                                        {formData.images.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={image}
                                                    alt={`Product ${index + 1}`}
                                                    className="h-20 w-20 object-cover rounded-lg"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
                                <button
                                    type="submit"
                                    className="w-full sm:flex-1 justify-center rounded-lg border border-transparent px-4 py-2 sm:py-3 bg-black text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    {product ? 'Update Product' : 'Create Product'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full sm:flex-1 justify-center rounded-lg border border-gray-300 px-4 py-2 sm:py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 transform hover:scale-[1.02]"
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