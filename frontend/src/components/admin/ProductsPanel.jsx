import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiMoreVertical, FiPlus } from 'react-icons/fi';
import ProductModal from './ProductModal';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../store/features/productSlice';

const ProductsPanel = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error, filters, totalPages, currentPage, totalProducts } = useSelector((state) => state.products);
    
     
    console.log(products,"from the Products Panel")

    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleCreateProduct = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        setActiveDropdown(null);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await dispatch(deleteProduct(productId));
            dispatch(fetchProducts());
            setActiveDropdown(null);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const toggleDropdown = (productId) => {
        setActiveDropdown(activeDropdown === productId ? null : productId);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Product Management</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">Manage and monitor products</p>
                </div>
                <button
                    onClick={handleCreateProduct}
                    className="bg-black text-white px-5 py-2.5 rounded-lg flex items-center hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                >
                    <FiPlus className="mr-2" />
                    Add Product
                </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rating
                                </th>
                                <th scope="col" className="relative px-4 sm:px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products?.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-lg object-cover"
                                                    src={product.images[0]}
                                                    alt={product.title}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-[200px]">{product.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                            {product.category?.name}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ₹{product.price}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {product.quantity > 0 ? `In Stock (${product.quantity})` : 'Out of Stock'}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <span className="text-yellow-400 mr-1">★</span>
                                            <span>{product.averageRating?.toFixed(1) || 'N/A'}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="relative">
                                            <button
                                                onClick={() => toggleDropdown(product._id)}
                                                className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                                            >
                                                <FiMoreVertical className="h-5 w-5" />
                                            </button>
                                            {activeDropdown === product._id && (
                                                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                                    <div className="py-1" role="menu">
                                                        <button
                                                            onClick={() => handleEditProduct(product)}
                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            role="menuitem"
                                                        >
                                                            Edit Product
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProduct(product._id)}
                                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                            role="menuitem"
                                                        >
                                                            Delete Product
                                                        </button>
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
            <div className="sm:hidden space-y-3 animate-fadeIn px-2">
                {products?.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-3 space-y-3 transform hover:-translate-y-1">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start space-x-2 flex-1 min-w-0">
                                <img
                                    className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                                    src={product.images[0]}
                                    alt={product.title}
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 text-sm leading-tight truncate">{product.title}</div>
                                    <div className="text-xs text-gray-500 truncate">{product.description}</div>
                                </div>
                            </div>
                            <div className="relative flex-shrink-0">
                                <button
                                    onClick={() => toggleDropdown(product._id)}
                                    className="p-1.5 hover:bg-gray-100 rounded-full touch-manipulation"
                                >
                                    <FiMoreVertical className="h-5 w-5 text-gray-400" />
                                </button>
                                {activeDropdown === product._id && (
                                    <div className="absolute right-0 mt-1 w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 transform origin-top-right transition-all duration-200 ease-out scale-95 opacity-100">
                                        <div className="py-1" role="menu">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-200 touch-manipulation"
                                                role="menuitem"
                                            >
                                                Edit Product
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product._id)}
                                                className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 active:bg-gray-200 touch-manipulation"
                                                role="menuitem"
                                            >
                                                Delete Product
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="space-y-1">
                                <div className="text-gray-500">Category</div>
                                <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800 truncate max-w-full">
                                    {product.category?.name}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <div className="text-gray-500">Price</div>
                                <div className="font-medium">₹{product.price}</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-gray-500">Stock</div>
                                <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full truncate ${product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {product.quantity > 0 ? `In Stock (${product.quantity})` : 'Out of Stock'}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <div className="text-gray-500">Rating</div>
                                <div className="flex items-center">
                                    <span className="text-yellow-400 mr-0.5">★</span>
                                    <span>{product.averageRating?.toFixed(1) || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
                onSubmit={async (formData) => {
                    try {
                        if (selectedProduct) {
                            await dispatch(updateProduct({ id: selectedProduct._id, ...formData }));
                        } else {
                            await dispatch(createProduct(formData));
                        }
                        dispatch(fetchProducts());
                        setIsModalOpen(false);
                    } catch (error) {
                        console.error('Error saving product:', error);
                    }
                }}
            />
        </div>
    );
};

export default ProductsPanel;