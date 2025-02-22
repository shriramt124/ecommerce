import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
          image: 'https://plus.unsplash.com/premium_photo-1673823666050-bb56202cc9e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D',
      title: 'Elevate Your Ride',
      subtitle: 'with our adorably cute bunny',
      description: 'inspired design'
    },
    {
        image: 'https://plus.unsplash.com/premium_photo-1723867314055-4d65584dc6d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D',
      title: 'Elevate Your Ride',
      subtitle: 'with our adorably cute bunny',
      description: 'inspired design'
    },
    // Add more slides as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start z-20 px-20 text-white">
            <h1 className="text-6xl font-bold mb-4 animate-fade-in">{slide.title}</h1>
            <p className="text-3xl mb-2 animate-fade-in delay-200">{slide.subtitle}</p>
            <p className="text-2xl italic animate-fade-in delay-400">{slide.description}</p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
      >
        <FiChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
      >
        <FiChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;