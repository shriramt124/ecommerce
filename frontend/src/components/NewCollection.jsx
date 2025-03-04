import { FiChevronLeft, FiChevronRight, FiArrowRight, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/features/productSlice';
import { Link } from 'react-router-dom';

const NewCollection = () => {
  const dispatch = useDispatch();
  let { items: products, loading } = useSelector((state) => state.products);
  products = products.filter(product => product.isInCollection === true);
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

  if (loading) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-serif mb-2">New Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our exclusive collection of premium car fragrances, designed to elevate your driving experience.</p>
          </div>
          <div className="hidden items-center space-x-3">
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
          <div className="md:hidden absolute left-0 right-0 top-1/2 flex justify-between px-4 z-20 -translate-y-1/2">
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
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className="flex-shrink-0 w-[280px] snap-start"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                        {product.collectionType}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-10">
                      <button className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all duration-300 shadow-sm">
                        <FiHeart className="h-5 w-5" />
                      </button>
                    </div>
                    <img
                      src={hoveredIndex === index ? product.images[0] : product.images[1]}
                      alt={product.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-xs text-gray-500 mb-1">{product.category.name}</span>
                    <h3 className="font-medium text-gray-900 mb-2 flex-grow">{product.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-semibold">₹{product.price}</span>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-colors duration-300">
                        <FiShoppingBag className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop view: Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
            {products.map((product, index) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                className=""
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                        {product.collectionType}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-10">
                      <button className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 transition-all duration-300 shadow-sm">
                        <FiHeart className="h-5 w-5" />
                      </button>
                    </div>
                    <img
                      src={hoveredIndex === index ? product.images[0] : product.images[1]}
                      alt={product.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <span className="text-xs text-gray-500 mb-1">{product.category.name}</span>
                    <h3 className="font-medium text-gray-900 mb-2 flex-grow">{product.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-semibold">₹{product.price}</span>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-colors duration-300">
                        <FiShoppingBag className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCollection;
 