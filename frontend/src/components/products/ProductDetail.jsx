import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [expandedSection, setExpandedSection] = useState('description');

    // Sample product data - will be replaced with actual API data
    const product = {
        name: 'Sahara Oud - Premium Perfume & Pure Royalty in a Bottle',
        price: 899,
        originalPrice: 1499,
        rating: 4.8,
        reviews: 48,
        stock: 46,
        soldLastWeek: 46,
        images: [
            'https://images.unsplash.com/photo-1523293182086-7651a899d37f',
            'https://images.unsplash.com/photo-1541643600914-78b084683601',
            'https://images.unsplash.com/photo-1587017539504-67cfbddac569',
            'https://images.unsplash.com/photo-1594035910387-fea47794261f'
        ],
        videoUrl: 'https://www.youtube.com/embed/your-video-id',
        description: 'Experience the essence of luxury with Sahara Oud. This premium perfume combines rare oud with exotic spices and floral notes for a truly royal fragrance experience.',
        features: [
            'Long-lasting fragrance that stays for 8-12 hours',
            'Made with genuine Oud wood extract',
            'Alcohol-free formula',
            'Premium glass bottle with wooden cap',
            'Suitable for all occasions'
        ],
        usage: 'Apply to pulse points - wrists, neck, and behind ears. For best results, apply to clean, moisturized skin.',
        faq: [
            {
                question: 'Is this perfume suitable for sensitive skin?',
                answer: 'Yes, our alcohol-free formula is gentle on sensitive skin.'
            },
            {
                question: 'How long does the fragrance last?',
                answer: 'The fragrance typically lasts 8-12 hours on skin.'
            },
            {
                question: 'Is this an authentic Oud perfume?',
                answer: 'Yes, we use genuine Oud wood extract in our formula.'
            }
        ]
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[100px]">
            {/* Breadcrumb */}
            <nav className="flex mb-8 text-sm font-medium tracking-wider">
                <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">HOME</Link>
                <span className="mx-2 text-gray-500">/</span>
                <Link to="/premium-perfumes" className="text-gray-500 hover:text-gray-700 transition-colors">PREMIUM PERFUMES</Link>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-900">SAHARA OUD</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-6">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl shadow-lg">
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {product.images.slice(0, 3).map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg transition-all duration-300 ${selectedImage === index ? 'ring-2 ring-black shadow-md scale-105' : 'ring-1 ring-gray-200 hover:ring-gray-400'}`}
                            >
                                <img
                                    src={image}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{product.name}</h1>
                        <div className="mt-6 flex items-center">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`h-6 w-6 ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="ml-3 text-sm font-medium text-gray-500">{product.rating} ({product.reviews} reviews)</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">₹{product.price}</p>
                        <p className="text-lg sm:text-xl text-gray-500 line-through">₹{product.originalPrice}</p>
                    </div>

                    <div className="flex items-center space-x-4 text-sm font-medium text-gray-500">
                        <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            {product.soldLastWeek} Sold Last week
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8 4-8-4V5l8 4 8-4v2z" />
                            </svg>
                            {product.stock} in stock
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                                disabled={quantity <= 1}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="px-6 py-3 text-gray-900 font-medium border-x-2 border-gray-200">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                                disabled={quantity >= product.stock}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                        <button className="flex-1 bg-black text-white py-3 sm:py-4 px-4 sm:px-8 rounded-lg hover:bg-gray-900 transition-colors transform hover:scale-[1.02] duration-200 font-medium text-base sm:text-lg">
                            ADD TO CART
                        </button>
                    </div>

                    {/* Expandable Sections */}
                    <div className="space-y-2">
                        {/* Key Features */}
                        <div className="border border-gray-200">
                            <button
                                onClick={() => setExpandedSection(expandedSection === 'features' ? '' : 'features')}
                                className="flex justify-between items-center w-full py-4 text-left transition-colors hover:bg-gray-50 rounded-lg px-4"
                            >
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Key Features</h3>
                                <svg
                                    className={`w-5 h-5 transform transition-transform duration-300 ${expandedSection === 'features' ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSection === 'features' ? 'max-h-36 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <ul className="mt-4 space-y-2 px-4">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Product Description */}
                        <div className="border border-gray-200">
                            <button
                                onClick={() => setExpandedSection(expandedSection === 'description' ? '' : 'description')}
                                className="flex justify-between items-center w-full py-4 text-left transition-colors hover:bg-gray-50 rounded-lg px-4"
                            >
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Product Description</h3>
                                <svg
                                    className={`w-5 h-5 transform transition-transform duration-300 ${expandedSection === 'description' ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSection === 'description' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="mt-4 text-gray-600 leading-relaxed px-4">{product.description}</p>
                            </div>
                        </div>

                        {/* How to Use */}
                        <div className="border border-gray-200">
                            <button
                                onClick={() => setExpandedSection(expandedSection === 'usage' ? '' : 'usage')}
                                className="flex justify-between items-center w-full py-4 text-left transition-colors hover:bg-gray-50 rounded-lg px-4"
                            >
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">How to Use</h3>
                                <svg
                                    className={`w-5 h-5 transform transition-transform duration-300 ${expandedSection === 'usage' ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSection === 'usage' ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="mt-4 text-gray-600 leading-relaxed px-4">{product.usage}</p>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="border border-gray-200">
                            <button
                                onClick={() => setExpandedSection(expandedSection === 'faq' ? '' : 'faq')}
                                className="flex justify-between items-center w-full py-4 text-left transition-colors hover:bg-gray-50 rounded-lg px-4"
                            >
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">FAQ</h3>
                                <svg
                                    className={`w-5 h-5 transform transition-transform duration-300 ${expandedSection === 'faq' ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSection === 'faq' ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="mt-4 space-y-6 px-4">
                                    {product.faq.map((item, index) => (
                                        <div key={index} className="space-y-2">
                                            <h4 className="font-medium text-gray-900">{item.question}</h4>
                                            <p className="text-gray-600">{item.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Video Section */}
            <div className="mt-16 border-t border-gray-200 pt-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Product Demonstration</h2>
                    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-lg">
                        <iframe
                            src={product.videoUrl}
                            title="Product Video"
                            className="absolute top-0 left-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">Watch our detailed product demonstration to learn more about the features and benefits of Sahara Oud.</p>
                    </div>
                </div>
            </div>
            {/* Reach out to us section */}
            <div className="mt-16 border-t border-gray-200 pt-12 pb-8 bg-gray-50 rounded-2xl shadow-inner">
                <div className="text-center max-w-2xl mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="bg-white p-4 rounded-full shadow-md">
                            <svg className="h-10 w-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Need Help?</h2>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">Our support team is here to assist you</p>
                    <div className="mt-6 space-y-4">
                        <a href="mailto:support@unoaroma.com" className="block w-full sm:w-auto sm:inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors transform hover:scale-[1.02] duration-200 font-medium text-base">
                            <span className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2v4l.586-.586z" />
                                </svg>
                                support@unoaroma.com
                            </span>
                        </a>
                        <a href="tel:+919537737734" className="block w-full sm:w-auto sm:inline-block px-6 py-3 bg-white text-black border-2 border-black rounded-lg hover:bg-gray-50 transition-colors transform hover:scale-[1.02] duration-200 font-medium text-base sm:ml-4">
                            <span className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +919537737734
                            </span>
                        </a>
                    </div>
                    <p className="mt-6 text-sm text-gray-500">Available on weekdays from 09:30 AM to 05:30 PM</p>
                </div>
            </div>


        </div>
    );
};

export default ProductDetail;