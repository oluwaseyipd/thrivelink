import Modal from "@/components/ui/modal"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Star, CheckCircle } from "lucide-react"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  image: string
}

interface EventDetailModalProps {
  isOpen: boolean
  onClose: () => void
  onRegister: () => void
  event: Event | null
}

const EventDetailModal = ({ isOpen, onClose, onRegister, event }: EventDetailModalProps) => {
  if (!event) return null

  const handleRegisterClick = () => {
    onClose()
    onRegister()
  }

  const eventDetails = {
    1: {
      instructor: "Sarah Johnson",
      duration: "6 hours",
      maxParticipants: 25,
      currentRegistrations: 18,
      prerequisites: "Basic computer skills",
      whatYouWillLearn: [
        "HTML fundamentals and semantic markup",
        "CSS styling and responsive design",
        "JavaScript basics and DOM manipulation",
        "Building your first interactive website"
      ],
      agenda: [
        { time: "10:00 AM - 11:30 AM", topic: "HTML Fundamentals" },
        { time: "11:30 AM - 12:00 PM", topic: "Break" },
        { time: "12:00 PM - 1:30 PM", topic: "CSS Styling" },
        { time: "1:30 PM - 2:30 PM", topic: "Lunch Break" },
        { time: "2:30 PM - 4:00 PM", topic: "JavaScript Basics & Project" }
      ]
    },
    2: {
      instructor: "Multiple Industry Experts",
      duration: "2 hours",
      maxParticipants: 100,
      currentRegistrations: 67,
      prerequisites: "None",
      whatYouWillLearn: [
        "Current tech industry trends and opportunities",
        "How to prepare for tech interviews",
        "Networking strategies in tech",
        "Career transition tips from different backgrounds"
      ],
      agenda: [
        { time: "6:00 PM - 6:15 PM", topic: "Welcome & Introductions" },
        { time: "6:15 PM - 7:00 PM", topic: "Panel Discussion" },
        { time: "7:00 PM - 7:30 PM", topic: "Q&A Session" },
        { time: "7:30 PM - 8:00 PM", topic: "Networking & Wrap-up" }
      ]
    },
    3: {
      instructor: "Mike Chen",
      duration: "4 hours",
      maxParticipants: 20,
      currentRegistrations: 15,
      prerequisites: "Basic JavaScript knowledge",
      whatYouWillLearn: [
        "React components and JSX",
        "State management with hooks",
        "Props and component communication",
        "Building a complete React application"
      ],
      agenda: [
        { time: "11:00 AM - 12:30 PM", topic: "React Fundamentals" },
        { time: "12:30 PM - 1:00 PM", topic: "Break" },
        { time: "1:00 PM - 2:30 PM", topic: "Hooks and State Management" },
        { time: "2:30 PM - 3:00 PM", topic: "Project Building & Q&A" }
      ]
    },
    4: {
      instructor: "Dr. Emily Rodriguez",
      duration: "3 hours",
      maxParticipants: 30,
      currentRegistrations: 22,
      prerequisites: "Basic math and statistics",
      whatYouWillLearn: [
        "Introduction to data science concepts",
        "Data analysis with Python basics",
        "Data visualization techniques",
        "Real-world data science applications"
      ],
      agenda: [
        { time: "9:00 AM - 10:00 AM", topic: "Data Science Overview" },
        { time: "10:00 AM - 10:15 AM", topic: "Break" },
        { time: "10:15 AM - 11:30 AM", topic: "Python for Data Analysis" },
        { time: "11:30 AM - 12:00 PM", topic: "Hands-on Practice & Next Steps" }
      ]
    }
  }

  const details = eventDetails[event.id as keyof typeof eventDetails] || eventDetails[1]

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-4xl mx-4 sm:mx-6 lg:mx-auto max-h-[95vh] overflow-y-auto">
      <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6">
        <DialogTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
          {event.title}
        </DialogTitle>
      </DialogHeader>

      <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-4 space-y-4 sm:space-y-6">
        {/* Event Image */}
        <div className="h-48 sm:h-56 lg:h-64 overflow-hidden rounded-lg">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column - Event Details */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-thrive-blue flex-shrink-0" />
              <span className="break-words">{event.date}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-thrive-blue flex-shrink-0" />
              <span className="break-words">{event.time} ({details.duration})</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-thrive-blue flex-shrink-0" />
              <span className="break-words">{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-thrive-blue flex-shrink-0" />
              <span>{details.currentRegistrations}/{details.maxParticipants} registered</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              <Star className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-thrive-blue flex-shrink-0" />
              <span className="break-words">Instructor: {details.instructor}</span>
            </div>
          </div>

          {/* Right Column - Description & Prerequisites */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Description</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{event.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Prerequisites</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{details.prerequisites}</p>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">What You'll Learn</h4>
          <div className="space-y-2 sm:space-y-3">
            {details.whatYouWillLearn.map((item, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="mr-2 sm:mr-3 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Event Agenda */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">Event Agenda</h4>
          <div className="space-y-2">
            {details.agenda.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 px-3 sm:px-4 bg-gray-50 dark:bg-gray-700 rounded gap-1 sm:gap-2">
                <span className="font-medium text-thrive-blue text-sm sm:text-base flex-shrink-0">{item.time}</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{item.topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-600 sticky bottom-0 bg-white dark:bg-gray-800 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-4 sm:pb-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto order-2 sm:order-1 text-sm sm:text-base py-2 sm:py-2.5"
          >
            Close
          </Button>
          <Button
            onClick={handleRegisterClick}
            className="w-full sm:w-auto order-1 sm:order-2 bg-thrive-blue hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-2.5 font-medium"
            disabled={details.currentRegistrations >= details.maxParticipants}
          >
            {details.currentRegistrations >= details.maxParticipants ? "Event Full" : "Register Now"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EventDetailModal;