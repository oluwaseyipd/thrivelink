import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";



const userTestimony = [
  {
    text: "The mentorship program at TechHub completely transformed my career trajectory. I went from struggling with basic concepts to landing a senior developer role in just 8 months.",
    name: "Sarah Mitchell",
    role: "Senior Developer at Microsoft",
  },
  {
    text: "I was skeptical about online learning until I joined this community. The hands-on projects and peer support made all the difference in my understanding of complex algorithms.",
    name: "Marcus Johnson",
    role: "Software Engineer at Google",
  },
  {
    text: "The real-world projects and industry connections I gained here were invaluable. I'm now working at my dream company and couldn't be happier with my career progression.",
    name: "Emily Rodriguez",
    role: "Full Stack Developer at Stripe",
  },
  {
    text: "As a career changer from marketing to tech, I was overwhelmed by the learning curve. The structured curriculum and supportive community here made my transition smooth and successful.",
    name: "David Chen",
    role: "Data Scientist at Netflix",
  },
  {
    text: "The collaborative environment and cutting-edge resources provided here helped me develop skills I never thought possible. I'm now leading a team of developers and loving every moment of it.",
    name: "Rachel Thompson",
    role: "Tech Lead at Airbnb",
  }
];

const Testimonial = () => {

     const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Create extended array for seamless looping
  const extendedTestimonials = [...userTestimony, ...userTestimony];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Reset to beginning when we reach the end of first set
    if (currentIndex >= userTestimony.length) {
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

  return (
    // Custom Slider - One Card at a Time
    <div className="relative max-w-4xl mx-auto">
      {/* Slider Container */}
      <div className="overflow-hidden rounded-xl">
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {extendedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`} 
              className="bg-blue-50 dark:bg-gray-700 p-8 rounded-xl max-w-4xl mx-auto min-w-full"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex justify-center">

                    <div className="text-6xl text-thrive-blue flex items-center justify-center">
                      <Star className="w-16 h-16" />
                    </div>

                </div>
                <div className="md:w-3/4">
                  <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="font-medium text-gray-900 dark:text-white">
                    — {testimonial.name}, {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Motion Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {userTestimony.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === (currentIndex % userTestimony.length) 
                ? 'bg-blue-600 scale-110' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Testimonial;
