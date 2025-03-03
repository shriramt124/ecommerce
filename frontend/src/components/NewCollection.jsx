import { FiChevronLeft, FiChevronRight, FiArrowRight, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { useState, useRef } from 'react';

const NewCollection = () => {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
      id: 1,
      title: 'Evair Air Aqua Fresh: 30ml Car Freshener',
      price: 455.00,
      mrp: 499.00,
      image: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxwZXJmdW1lfGVufDB8fDB8fHww',
      hoverImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop',
      link: '/product/aqua-fresh',
      tag: 'New',
      category: 'Car Perfume'
    },
    {
      id: 2,
      title: 'Evair Citrus Breeze: 30ml Car Freshener',
      price: 455.00,
      mrp: 499.00,
      image: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxwZXJmdW1lfGVufDB8fDB8fHww',
      hoverImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop',
      link: '/product/citrus-breeze',
      tag: 'Bestseller',
      category: 'Car Perfume'
    },
    {
      id: 3,
      title: 'Evair Creamy Vanilla: 30ml Car Freshener',
      price: 455.00,
      mrp: 499.00,
      image: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxwZXJmdW1lfGVufDB8fDB8fHww',
      hoverImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop',
      link: '/product/creamy-vanilla',
      tag: 'Limited',
      category: 'Car Perfume'
    },
    {
      id: 4,
      title: 'Evair Fruity Fusion: 30ml Car Freshener',
      price: 455.00,
      mrp: 499.00,
      image: 'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHxwZXJmdW1lfGVufDB8fDB8fHww',
      hoverImage: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop',
      link: '/product/fruity-fusion',
      tag: 'New',
      category: 'Car Perfume'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-serif mb-2">New Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our exclusive collection of premium car fragrances, designed to elevate your driving experience.</p>
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

        <div className="relative">
          {/* Mobile scroll buttons - only visible on small screens */}
          <div className="md:hidden  absolute left-0 right-0 top-1/2 flex justify-between  px-4 z-20 -translate-y-1/2">
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
                className="flex-shrink-0 w-[280px] snap-start"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                        {product.tag}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-10">
                      <button className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all duration-300 shadow-sm">
                        <FiHeart className="h-5 w-5" />
                      </button>
                    </div>
                    <img
                      src={hoveredIndex === index ? product.hoverImage : product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-xs text-gray-500 mb-1">{product.category}</span>
                    <h3 className="font-medium text-gray-900 mb-2 flex-grow">{product.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <span className="text-lg font-semibold">₹{product.price.toFixed(2)}</span>
                        <span className="ml-2 text-xs text-gray-500 line-through">₹{product.mrp.toFixed(2)}</span>
                      </div>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-colors duration-300">
                        <FiShoppingBag className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view: Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className=""
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                        {product.tag}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-10">
                      <button className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all duration-300 shadow-sm">
                        <FiHeart className="h-5 w-5" />
                      </button>
                    </div>
                    <img
                      src={hoveredIndex === index ? product.hoverImage : product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-xs text-gray-500 mb-1">{product.category}</span>
                    <h3 className="font-medium text-gray-900 mb-2 flex-grow">{product.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <span className="text-lg font-semibold">₹{product.price.toFixed(2)}</span>
                        <span className="ml-2 text-xs text-gray-500 line-through">₹{product.mrp.toFixed(2)}</span>
                      </div>
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
              <span>View All Collection</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default NewCollection;
 