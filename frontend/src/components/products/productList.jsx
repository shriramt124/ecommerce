import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilters, resetFilters } from '../../store/features/productSlice';
import { addItemToCart } from '../../store/features/cartSlice';
import { Link } from 'react-router-dom';
import React from "react"

const ProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error, filters, totalPages, currentPage, totalProducts } = useSelector((state) => state.products);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    // Remove state for tracking availability dropdown visibility
    const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);

    // Remove ref for availability dropdown
    const priceRef = React.useRef(null);

    useEffect(() => {
        dispatch(fetchProducts(filters));
    }, [dispatch, filters]);

    // Update click outside handler to only close price dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (priceRef.current && !priceRef.current.contains(event.target)) {
                setPriceDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFilterChange = (field, value) => {
        dispatch(setFilters({ [field]: value, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        dispatch(setFilters({ page: newPage }));
    };

    const handleReset = () => {
        dispatch(resetFilters());
    };

    const toggleFilterModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const applyFilters = () => {
        setIsFilterModalOpen(false);
        // Filters are already applied through the handleFilterChange function
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="text-center text-red-600 p-4">
            Error: {error}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 mt-[100px] max-w-7xl">
            {/* Mobile Filter Button */}
            <div className="md:hidden mb-4">
                <button
                    onClick={toggleFilterModal}
                    className="w-full py-2 px-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between border border-gray-200"
                >
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Filter and sort</span>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{totalProducts} products</span>
                </button>
            </div>

            {/* Desktop Filter Bar */}
            <div className="hidden md:flex items-center justify-between mb-8 bg-white p-4">
                <div className="flex items-center">
                    <span className="mr-4 text-lg">Filter:</span>

                    {/* Price Dropdown */}
                    <div className="relative" ref={priceRef}>
                        <button
                            onClick={() => {
                                setPriceDropdownOpen(!priceDropdownOpen);
                            }}
                            className="flex items-center px-3 py-1.5 text-lg hover:bg-gray-50 rounded transition-colors"
                        >
                            Price
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Price Dropdown Menu */}
                        {priceDropdownOpen && (
                            <div className="absolute z-10 mt-1 w-44 bg-white p-2">
                                <div className="space-y-1">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="desktopPrice"
                                            value="0-1000"
                                            checked={filters.priceRange === '0-1000'}
                                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                            className="h-4 w-4"
                                        />
                                        <span className="ml-2 text-base">Under ₹1,000</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="desktopPrice"
                                            value="1000-5000"
                                            checked={filters.priceRange === '1000-5000'}
                                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                            className="h-4 w-4"
                                        />
                                        <span className="ml-2 text-base">₹1,000 - ₹5,000</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="desktopPrice"
                                            value="5000-10000"
                                            checked={filters.priceRange === '5000-10000'}
                                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                            className="h-4 w-4"
                                        />
                                        <span className="ml-2 text-base">₹5,000 - ₹10,000</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="desktopPrice"
                                            value="10000+"
                                            checked={filters.priceRange === '10000+'}
                                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                            className="h-4 w-4"
                                        />
                                        <span className="ml-2 text-base">Over ₹10,000</span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center">
                    <span className="mr-2 text-lg">Sort by:</span>
                    <select
                        value={filters.sort || '-createdAt'}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                        className="bg-white text-base py-1.5 px-3 appearance-none cursor-pointer hover:bg-gray-50 rounded transition-colors"
                    >
                        <option value="featured">Featured</option>
                        <option value="-createdAt">Newest First</option>
                        <option value="createdAt">Oldest First</option>
                        <option value="-price">Price: High to Low</option>
                        <option value="price">Price: Low to High</option>
                    </select>
                    <span className="ml-4 text-base">{totalProducts} products</span>
                </div>
            </div>

            {/* Filter Modal for Mobile */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/50 bg-opacity-50 transition-opacity duration-300"
                        onClick={toggleFilterModal}
                    ></div>
                    <div
                        className="absolute inset-y-0 right-0 max-w-full flex transform transition-transform duration-300 ease-in-out"
                        style={{ transform: isFilterModalOpen ? 'translateX(0)' : 'translateX(100%)' }}
                    >
                        <div className="relative w-screen max-w-sm">
                            <div className="h-full flex flex-col bg-white shadow-xl rounded-l-xl">
                                {/* Header */}
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                                        <button
                                            onClick={toggleFilterModal}
                                            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                                        >
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{totalProducts} products</p>
                                </div>

                                {/* Filter Content */}
                                <div className="flex-1 overflow-y-auto">
                                    {/* Price Section */}
                                    <div className="px-6 py-6 border-b border-gray-200">
                                        <h3 className="text-base font-semibold text-gray-900 mb-4">Price Range</h3>
                                        <div className="space-y-3">
                                            {[
                                                { value: '0-1000', label: 'Under ₹1,000' },
                                                { value: '1000-5000', label: '₹1,000 - ₹5,000' },
                                                { value: '5000-10000', label: '₹5,000 - ₹10,000' },
                                                { value: '10000+', label: 'Over ₹10,000' }
                                            ].map((option) => (
                                                <label key={option.value} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="mobilePrice"
                                                        value={option.value}
                                                        checked={filters.priceRange === option.value}
                                                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                                        className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                                                    />
                                                    <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sort By Section */}
                                    <div className="px-6 py-6 border-b border-gray-200">
                                        <h3 className="text-base font-semibold text-gray-900 mb-4">Sort By</h3>
                                        <select
                                            value={filters.sort || '-createdAt'}
                                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                                            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                                        >
                                            <option value="featured">Featured</option>
                                            <option value="-createdAt">Newest First</option>
                                            <option value="createdAt">Oldest First</option>
                                            <option value="-price">Price: High to Low</option>
                                            <option value="price">Price: Low to High</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="border-t border-gray-200 px-6 py-4 space-y-3">
                                    <button
                                        onClick={applyFilters}
                                        className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                    >
                                        Apply Filters
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="w-full text-gray-700 hover:text-gray-900 text-sm font-medium"
                                    >
                                        Reset all filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products && products.map((product) => (
                    <div key={product._id} className="group relative bg-gray-200/50   shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <Link to={`/products/${product._id}`} className="block">
                            <div className="relative overflow-hidden">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-[280px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                {product.price < 500 && (
                                    <span className="absolute top-4 right-4 bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full">Sale</span>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-black transition-colors line-clamp-1">{product.title}</h3>
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</p>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-400 text-lg">★</span>
                                        <span className="text-sm text-gray-600">
                                            {product.averageRating ? product.averageRating.toFixed(1) : 'New'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 capitalize">{product.category?.name || 'General'}</span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(addItemToCart({ productId: product._id, quantity: 1 }));
                                        }}
                                        className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded-lg ${page === currentPage
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}

            {/* Products Count */}
            <div className="text-center mt-4 text-gray-600">
                Showing {products.length} of {totalProducts} products
            </div>
        </div>
    );
}

export default ProductList;