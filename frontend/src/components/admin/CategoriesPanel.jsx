import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiMoreVertical, FiPlus } from 'react-icons/fi';
import CategoryModal from './CategoryModal';
import { fetchCategories, createCategory, deleteCategory } from '../../store/features/categorySlice';

const CategoriesPanel = () => {
    const dispatch = useDispatch();
    const { items: categories, loading } = useSelector((state) => state.categories);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCreateCategory = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await dispatch(deleteCategory(categoryId));
            dispatch(fetchCategories());
            setActiveDropdown(null);
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const toggleDropdown = (categoryId) => {
        setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
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
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Category Management</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">Manage product categories</p>
                </div>
                <button
                    onClick={handleCreateCategory}
                    className="bg-black text-white px-5 py-2.5 rounded-lg flex items-center hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                >
                    <FiPlus className="mr-2" />
                    Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                    <div key={category._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                                <p className="text-sm text-gray-500">{category.slug}</p>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => toggleDropdown(category._id)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                >
                                    <FiMoreVertical className="h-5 w-5 text-gray-400" />
                                </button>
                                {activeDropdown === category._id && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                        <div className="py-1" role="menu">
                                            <button
                                                onClick={() => handleDeleteCategory(category._id)}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Delete Category
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-2">
                            <span className="text-sm text-gray-500">
                                {category.products?.length || 0} Products
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category={selectedCategory}
                onSubmit={async (formData) => {
                    try {
                        await dispatch(createCategory(formData));
                        await dispatch(fetchCategories());
                        setIsModalOpen(false);
                    } catch (error) {
                        console.error('Error saving category:', error);
                        alert('Error saving category');
                    }
                }}
            />
        </div>
    );
};

export default CategoriesPanel;