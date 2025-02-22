import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    // Sample placeholder data
    const sampleProducts = [
        {
            _id: '1',
            name: 'Classic White Sneakers',
            price: 89.99,
            description: 'Comfortable everyday sneakers',
            images: [{ url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772' }],
            category: 'Sneakers',
            stock: 15,
        },
        {
            _id: '2',
            name: 'Running Performance Shoes',
            price: 129.99,
            description: 'Professional running shoes',
            images: [{ url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' }],
            category: 'Sports',
            stock: 8,
        },
        {
            _id: '3',
            name: 'Casual Canvas Shoes',
            price: 49.99,
            description: 'Lightweight casual shoes',
            images: [{ url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77' }],
            category: 'Casual',
            stock: 20,
        },
        {
            _id: '4',
            name: 'Leather Business Shoes',
            price: 159.99,
            description: 'Premium leather formal shoes',
            images: [{ url: 'https://images.unsplash.com/photo-1560343090-f0409e92791a' }],
            category: 'Formal',
            stock: 5,
        },
    ];

    const categories = ['All', 'Sneakers', 'Sports', 'Casual', 'Formal'];

    const [products, setProducts] = useState(sampleProducts);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        category: 'All',
        sort: 'featured',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        setLoading(true);
        try {
            let filteredProducts = [...sampleProducts];

            // Apply category filter
            if (filters.category !== 'All') {
                filteredProducts = filteredProducts.filter((product) => product.category === filters.category);
            }

            // Apply sorting
            switch (filters.sort) {
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    filteredProducts.reverse();
                    break;
                default:
                    // Keep original order for 'featured'
                    break;
            }

            setProducts(filteredProducts);
            setCurrentPage(1); // Reset to first page when filters change
        } catch (error) {
            console.error('Error filtering products:', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[100px]">
            {/* Mobile Filter Button */}
            <button
                className="md:hidden w-full flex items-center justify-between p-4 bg-white border rounded-lg mb-4"
                onClick={() => setIsFilterDrawerOpen(true)}
            >
                <span className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Filter and sort
                </span>
                <span className="text-gray-600">{products.length} products</span>
            </button>

            {/* Filter Drawer for Mobile */}
            <div
                className={`fixed inset-0 z-50 md:hidden ${isFilterDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 ease-in-out`}
            >
                <div className="fixed inset-0" onClick={() => setIsFilterDrawerOpen(false)} />
                <div className="fixed inset-y-0 right-0 max-h-full w-[80%] bg-white shadow-xl overflow-y-auto">
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-medium">Filter and sort</h2>
                            <button
                                onClick={() => setIsFilterDrawerOpen(false)}
                                className="p-2 rounded-md hover:bg-gray-100"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 p-4 space-y-6">
                            <div>
                                <h3 className="text-sm font-medium mb-3">Category</h3>
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium mb-3">Sort by</h3>
                                <select
                                    value={filters.sort}
                                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="newest">Newest</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-4 border-t bg-white">
                            <button
                                onClick={() => setIsFilterDrawerOpen(false)}
                                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-900 transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                    <span className="text-gray-700">Filter by:</span>
                    <div className="min-w-[150px]">
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700">Sort by:</span>
                        <select
                            value={filters.sort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                    <span className="text-gray-600 ml-4">{products.length} products</span>
                </div>
            </div>

            {/* Overlay for mobile drawer */}
            {isFilterDrawerOpen && (
                <div
                    className="fixed inset-0 bg-gray-100/50  bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsFilterDrawerOpen(false)}
                />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={product.images[0]?.url}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">${product.price}</p>
                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center my-8 gap-2">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                    &lt;
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                    &gt;
                </button>
            </div>
        </div>
  );
}

export default ProductList; 