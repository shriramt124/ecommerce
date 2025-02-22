import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import React from 'react';

const NewCollection = () => {
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

  const products = [
    {
      title: 'Evair Air Aqua Fresh: 30ml Car Freshener',
      price: 455.00,
      mrp: 499.00,
          image: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxwZXJmdW1lfGVufDB8fDB8fHww',
      link: '/product/aqua-fresh'
    },
    {
      title: 'Evair Citrus Breeze: 30ml Car Freshener',
      price: 455.00,
      mrp: 499.00,
        image: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxwZXJmdW1lfGVufDB8fDB8fHww',
      link: '/product/citrus-breeze'
    },
    {
      title: 'Evair Creamy Vanilla: 30ml Car Freshener',
      price: 455.00,
      mrp: 499.00,
        image: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxwZXJmdW1lfGVufDB8fDB8fHww',
      link: '/product/creamy-vanilla'
    },
    {
      title: 'Evair Fruity Fusion: 30ml Car Freshener',
      price: 455.00,
      mrp: 499.00,
        image: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxwZXJmdW1lfGVufDB8fDB8fHww',
      link: '/product/fruity-fusion'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-center mb-12">New Collection</h2>
        <div className="relative">
          {/* Mobile scroll buttons - only visible on small screens */}
          <div className="md:hidden absolute left-0 right-0 top-1/2 flex justify-between px-4 z-20 -translate-y-1/2">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-full bg-white shadow-xl hover:bg-gray-100 transition-colors sticky left-4"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-full bg-white shadow-xl hover:bg-gray-100 transition-colors sticky right-4"
              aria-label="Scroll right"
            >
              <FiChevronRight className="h-6 w-6" />
            </button>
          </div>
          <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4"
            style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[240px] sm:w-full snap-start"
              >
                <a href={product.link} className="block group">
                  <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="mt-2 flex items-center">
                      <span className="text-lg sm:text-xl font-semibold text-gray-900">₹{product.price.toFixed(2)}</span>
                      <span className="ml-2 text-xs sm:text-sm text-gray-500 line-through">₹{product.mrp.toFixed(2)}</span>
                    </div>
                    <button className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base">
                      Add to Cart
                    </button>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCollection;