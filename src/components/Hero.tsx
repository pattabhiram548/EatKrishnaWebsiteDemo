import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChooseYourLaddu from './ChooseYourLaddu';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showChooseYourLaddu, setShowChooseYourLaddu] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      image: 'https://static.vecteezy.com/system/resources/thumbnails/045/595/418/small/healthy-energy-balls-made-of-dried-fruits-and-nuts-healthy-food-photo.jpg',
      title: 'Fuel Your Day the Clean Way',
      description: 'Power-packed protein bars made with real ingredients.'
    },
    {
      image: 'https://static.vecteezy.com/system/resources/previews/049/082/160/non_2x/traditional-indian-sweets-laddu-and-pedha-ready-to-be-gifted-or-enjoyed-during-celebrations-like-diwali-and-raksha-bandhan-free-photo.jpeg',
      title: 'No Junk. Just Results.',
      description: 'Gluten-free. Low sugar. 100% performance.'
    },
    {
      image: 'https://5.imimg.com/data5/TT/RZ/SL/SELLER-81393144/dry-fruit-laddu.jpg',
      title: "More Than a Bar—It's a Lifestyle",
      description: 'Join the movement of mindful snacking.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                  {slide.description}
                </p>
                <div className="flex flex-col items-center gap-4 justify-center">
                  <div className="flex flex-col items-center gap-3">
                  <button
  onClick={() => setShowChooseYourLaddu(true)}
  className="group relative inline-flex items-center justify-center 
    px-8 sm:px-12 md:px-20 lg:px-24 py-3 sm:py-4 md:py-5 
    text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white
    bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-full
    shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform
    hover:scale-105 hover:-translate-y-0.5
    ring-4 sm:ring-5 md:ring-6 ring-orange-400/30 hover:ring-orange-400/50
    animate-[pulse_2s_ease-in-out_infinite]"
>
  <Sparkles className="h-5 sm:h-6 md:h-8 lg:h-10 w-5 sm:w-6 md:w-8 lg:w-10 mr-2 sm:mr-3 md:mr-4 group-hover:rotate-12 transition-transform duration-300" />
  <span className="relative z-10">Choose Your Laddu</span>

  {/* Glow layers */}
  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
</button>




                    <p className="text-sm md:text-base text-white/90 font-medium max-w-md text-center px-4">
                      Create your own healthy laddu with custom ingredients
                    </p>
                  </div>
                  <button
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors duration-200"
                    onClick={() => navigate('/about')}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Choose Your Laddu Modal */}
      <ChooseYourLaddu
        isOpen={showChooseYourLaddu}
        onClose={() => setShowChooseYourLaddu(false)}
      />
    </section>
  );
};

export default Hero;