import { Loader } from 'lucide-react'
import { useState, useEffect } from 'react'

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  
  const loadingTexts = [
    "Loading your experience...",
    "Connecting you to opportunities...",
    "Building your tech community..."
  ]

  // Auto-hide preloader after 6 seconds for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  // Cycle through loading texts
  useEffect(() => {
    const textTimer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length)
    }, 2000)
    return () => clearInterval(textTimer)
  }, [])

  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Main Preloader Content */}
      <div className="relative z-10 text-center">
        {/* Animated Text */}
        <div className="space-y-2 mb-8">
          <div className="flex justify-center items-center space-x-1">
            {'THRIVE LINK'.split('').map((letter, index) => (
              <span
                key={index}
                className="text-4xl md:text-5xl font-bold text-thrive-blue inline-block animate-bounce"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '1s',
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          
          {/* <div className="flex justify-center items-center space-x-1">
            {'LINK'.split('').map((letter, index) => (
              <span
                key={index}
                className="text-4xl md:text-5xl font-bold text-gray-600 inline-block animate-bounce"
                style={{
                  animationDelay: `${(index + 6) * 0.1}s`,
                  animationDuration: '1s',
                }}
              >
                {letter}
              </span>
            ))}
          </div> */}
        </div>

        {/* Changing Loading Text */}
        <p className="text-gray-500 text-sm animate-pulse h-6 flex items-center justify-center">
          {loadingTexts[currentTextIndex]}
        </p>
      </div>

      {/* Custom CSS for additional animations */}
      <style tsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

export default PageLoader;