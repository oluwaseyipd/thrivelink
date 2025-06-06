import { useState, useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "Joining ThriveLink was a game-changer for my career. The mentorship I received helped me land my dream job at a top tech company.",
    name: "Alex Johnson",
    role: "Frontend Developer",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 2,
    quote: "The resources and community support at ThriveLink accelerated my learning curve. I went from novice to confident developer in just 6 months.",
    name: "Samantha Lee",
    role: "Full Stack Engineer",
    company: "StartupInc",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 3,
    quote: "As someone transitioning into tech from a different industry, ThriveLink's supportive community made all the difference in building my confidence and skills.",
    name: "Marcus Taylor",
    role: "Data Analyst",
    company: "AnalyticsPro",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Create extended array for seamless looping
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Handle responsive slides count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1); // Mobile: 1 slide
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2); // Tablet: 2 slides
      } else {
        setSlidesToShow(3); // Desktop: 3 slides
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Reset to beginning when we reach the end of first set
    if (currentIndex >= testimonials.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 500);
    }
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsTransitioning(true);
  };

  const getTransformValue = () => {
    return `translateX(-${currentIndex * (100 / slidesToShow)}%)`;
  };

  const getSlideWidth = () => {
    return `${100 / slidesToShow}%`;
  };

  return (
    <section id="testimonials" className="section bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
            Success Stories
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 px-4">
            Hear from community members who have transformed their careers with ThriveLink.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-lg">
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: getTransformValue() }}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <div 
                  key={`${testimonial.id}-${index}`} 
                  className="flex-shrink-0 px-2 sm:px-3 lg:px-4"
                  style={{ width: getSlideWidth() }}
                >
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg h-full">
                    <div className="flex mb-3 sm:mb-4">
                      <svg className="text-blue-600 h-5 w-5 sm:h-6 sm:w-6 mr-2" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full mr-3 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === (currentIndex % testimonials.length) 
                    ? 'bg-blue-600 scale-110' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;