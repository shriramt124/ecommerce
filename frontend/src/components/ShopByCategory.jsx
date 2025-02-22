import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import React from 'react';

const ShopByCategory = () => {
  const containerRef = React.useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const categories = [
    {
      title: 'Car Perfumes',
          image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D',
      link: '/category/car-perfumes'
    },
    {
      title: 'Home & Decor',
        image: 'https://images.unsplash.com/photo-1595535373192-fc8935bacd89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D',
      link: '/category/home-decor'
    },
    {
      title: 'Candles',
        image: 'https://images.unsplash.com/photo-1594125311687-3b1b3eafa9f4?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '/category/candles'
    },
    {
      title: 'Shop by Fragrances',
        image: 'https://images.unsplash.com/photo-1623607314438-ee4df4336c6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D',
      link: '/category/fragrances'
    }
  ];

  return (
    <section className="py-16 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-12">Shop by Category</h2>
        {/* Mobile scroll buttons */}
        <div className="md:hidden absolute left-0 right-0 top-1/2 flex justify-between px-4 z-20 -translate-y-1/2">
          <button
            onClick={scrollLeft}
            className="p-3 rounded-full bg-white shadow-xl hover:bg-gray-100 transition-colors"
            aria-label="Scroll left"
          >
            <FiChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollRight}
            className="p-3 rounded-full bg-white shadow-xl hover:bg-gray-100 transition-colors"
            aria-label="Scroll right"
          >
            <FiChevronRight className="h-6 w-6" />
          </button>
        </div>
        <div
          ref={containerRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}>
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className="group relative block flex-shrink-0 w-[200px] sm:w-[240px] md:w-auto"
            >
              <div className="aspect-square w-full overflow-hidden rounded-full bg-gray-100 transition-transform duration-300 group-hover:scale-95">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                  {category.title}
                </h3>
                <div className="mt-2 flex items-center justify-center">
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Shop Now</span>
                  <FiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;