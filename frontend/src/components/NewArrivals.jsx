import { useState, useRef } from 'react';
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiShoppingBag } from 'react-icons/fi';

const NewArrivals = () => {
    const containerRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const products = [
        {
            id: 1,
            name: 'Mountain Breeze Car Diffuser',
            price: '₹1,299',
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop',
            hoverImage: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop',
            tag: 'New',
            category: 'Car Perfume'
        },
        {
            id: 2,
            name: 'Lavender Dreams Candle Set',
            price: '₹899',
            image: 'https://images.unsplash.com/photo-1602523961854-d8a71561b8d1?q=80&w=1974&auto=format&fit=crop',
            hoverImage: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1974&auto=format&fit=crop',
            tag: 'Limited',
            category: 'Candles'
        },
        {
            id: 3,
            name: 'Citrus Burst Room Spray',
            price: '₹749',
            image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932&auto=format&fit=crop',
            hoverImage: 'https://images.unsplash.com/photo-1616486029016-0735d416d693?q=80&w=1932&auto=format&fit=crop',
            tag: 'New',
            category: 'Home & Decor'
        },
        {
            id: 4,
            name: 'Sandalwood Luxury Diffuser',
            price: '₹1,499',
            image: 'https://images.unsplash.com/photo-1596461010505-0712e0243f8e?q=80&w=1970&auto=format&fit=crop',
            hoverImage: 'https://images.unsplash.com/photo-1596460107916-1a5a4e2b4a86?q=80&w=1970&auto=format&fit=crop',
            tag: 'Bestseller',
            category: 'Home & Decor'
        },
        {
            id: 5,
            name: 'Ocean Mist Car Freshener',
            price: '₹999',
            image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?q=80&w=1970&auto=format&fit=crop',
            hoverImage: 'https://images.unsplash.com/photo-1625772452718-5b32cc57f33a?q=80&w=1970&auto=format&fit=crop',
            tag: 'New',
            category: 'Car Perfume'
        },
        {
            id: 6,
            name: 'Vanilla Spice Reed Diffuser',
            price: '₹1,199',
            image: 'https://images.unsplash.com/photo-1599446794254-16ca8acf93d9?q=80&w=1964&auto=format&fit=crop',
            hoverImage: 'https://images.unsplash.com/photo-1599446381279-a1195bc50514?q=80&w=1964&auto=format&fit=crop',
            tag: 'Limited',
            category: 'Home & Decor'
        }
    ];

    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-10">
                    <div className="text-center mb-6">
                        <h2 className="text-4xl font-serif mb-2">New Arrivals</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Discover our latest collection of premium fragrances and home essentials, crafted for those who appreciate luxury in every detail.</p>
                    </div>
                    <div className="hidden   items-center space-x-3">
                        <button
                            onClick={scrollLeft}
                            className="p-3 rounded-full border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                            aria-label="Scroll left"
                        >
                            <FiChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="p-3 rounded-full border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                            aria-label="Scroll right"
                        >
                            <FiChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile scroll buttons - only visible on small screens */}
                <div className="md:hidden absolute right-4 left-4 flex justify-between z-10 top-1/2 transform -translate-y-1/2">
                    <button
                        onClick={scrollLeft}
                        className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                        aria-label="Scroll left"
                    >
                        <FiChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                        aria-label="Scroll right"
                    >
                        <FiChevronRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Mobile view: Carousel */}
                <div
                    ref={containerRef}
                    className="md:hidden flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
                    style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
                >
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="flex-shrink-0 w-[240px] snap-start"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                                <div className="relative overflow-hidden aspect-[4/5]">
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                                            {product.tag}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3 z-10">
                                        <button className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all duration-300 shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <img
                                        src={hoveredIndex === index ? product.hoverImage : product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out hover:scale-105"
                                    />
                                </div>
                                <div className="p-3 flex flex-col flex-grow">
                                    <span className="text-xs text-gray-500 mb-1">{product.category}</span>
                                    <h3 className="font-medium text-gray-900 mb-2 flex-grow">{product.name}</h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-lg font-semibold">{product.price}</span>
                                        <button className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-colors duration-300">
                                            <FiShoppingBag className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop view: Two-row grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 pb-8">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className=""
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                                <div className="relative overflow-hidden aspect-[4/5]">
                                    <div className="absolute top-3 left-3 z-10">
                                        <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                                            {product.tag}
                                        </span>
                                    </div>
                                    <div className="absolute top-3 right-3 z-10">
                                        <button className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all duration-300 shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <img
                                        src={hoveredIndex === index ? product.hoverImage : product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out hover:scale-105"
                                    />
                                </div>
                                <div className="p-3 flex flex-col flex-grow">
                                    <span className="text-xs text-gray-500 mb-1">{product.category}</span>
                                    <h3 className="font-medium text-gray-900 mb-2 flex-grow">{product.name}</h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-lg font-semibold">{product.price}</span>
                                        <button className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-colors duration-300">
                                            <FiShoppingBag className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="text-center mt-8">
                    <a href="#" className="inline-flex items-center text-black hover:text-gray-700 font-medium group">
                        <span>View All New Arrivals</span>
                        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div> */}
            </div>
        </section>
    );
};

export default NewArrivals;