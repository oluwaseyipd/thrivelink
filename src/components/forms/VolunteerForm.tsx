import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { X, User, Mail, Phone, MapPin, Clock, FileText } from "lucide-react"
import { toast } from "sonner"

import Modal from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SuccessModal from "@/components/forms/SuccessModal"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  country: z.string().min(2, { message: "Please enter your country" }),
  timezone: z.string().min(2, { message: "Please enter your timezone" }),
  volunteerArea: z.string().min(1, { message: "Please select a volunteer area" }),
  otherVolunteerArea: z.string().optional(),
  availability: z.string().min(2, { message: "Please describe your availability" }),
  motivation: z.string().min(10, { message: "Please share your motivation for volunteering" }),
  experience: z.string().optional(),
  consent: z.boolean().refine(value => value === true, {
    message: "You must agree to be contacted"
  }),
})

type FormValues = z.infer<typeof formSchema>

interface VolunteerFormProps {
  isOpen: boolean
  onClose: () => void
}

const VolunteerForm = ({ isOpen, onClose }: VolunteerFormProps) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showOtherAreaInput, setShowOtherAreaInput] = useState(false)
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      timezone: "",
      volunteerArea: "",
      otherVolunteerArea: "",
      availability: "",
      motivation: "",
      experience: "",
      consent: false,
    },
  })
  
  const handleAreaChange = (value: string) => {
    setShowOtherAreaInput(value === "Other")
  }

  const onSubmit = (data: FormValues) => {
    // Here you would send data to your backend
    console.log("Volunteer form submitted:", data)
    
    // Show success toast notification
    toast.success("Application submitted successfully!")
    
    // Close form and show success modal
    setShowSuccessModal(true)
  }

  const handleCloseSuccess = () => {
    setShowSuccessModal(false)
    onClose()
    form.reset()
  }

  const volunteerAreas = [
    "Mentor",
    "Content Writer",
    "Social Media Manager",
    "Community Moderator",
    "Graphics Designer",
    "Event Planner",
    "Other"
  ]

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-2xl mx-4 sm:mx-6 lg:mx-auto max-h-[95vh] overflow-y-auto">
        <div className="relative p-4 sm:p-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 h-8 w-8 sm:h-10 sm:w-10" 
            onClick={onClose}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          
          <div className="mb-6 sm:mb-8 text-center pr-8 sm:pr-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Apply to Volunteer
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
              Share your skills and help grow the Thrive Link community
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-1">
                      <FormLabel className="text-sm sm:text-base font-medium">Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <Input 
                            placeholder="John Doe" 
                            className="pl-10 sm:pl-11 h-11 sm:h-12 text-sm sm:text-base" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-1">
                      <FormLabel className="text-sm sm:text-base font-medium">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <Input 
                            placeholder="email@example.com" 
                            className="pl-10 sm:pl-11 h-11 sm:h-12 text-sm sm:text-base" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-1">
                      <FormLabel className="text-sm sm:text-base font-medium">Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <Input 
                            placeholder="+1 234 567 8900" 
                            className="pl-10 sm:pl-11 h-11 sm:h-12 text-sm sm:text-base" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-1">
                      <FormLabel className="text-sm sm:text-base font-medium">Country</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <Input 
                            placeholder="Your country" 
                            className="pl-10 sm:pl-11 h-11 sm:h-12 text-sm sm:text-base" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
                
                {/* Timezone */}
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-1">
                      <FormLabel className="text-sm sm:text-base font-medium">Time Zone</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., GMT+1, EST" 
                          className="h-11 sm:h-12 text-sm sm:text-base" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                {/* Volunteer Area */}
                <FormField
                  control={form.control}
                  name="volunteerArea"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-1">
                      <FormLabel className="text-sm sm:text-base font-medium">Area you'd like to volunteer in</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value)
                          handleAreaChange(value)
                        }} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base">
                            <SelectValue placeholder="Select an area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {volunteerAreas.map((area) => (
                            <SelectItem key={area} value={area} className="text-sm sm:text-base">
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                {/* Other Volunteer Area */}
                {showOtherAreaInput && (
                  <FormField
                    control={form.control}
                    name="otherVolunteerArea"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-1">
                        <FormLabel className="text-sm sm:text-base font-medium">Specify Other Area</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your volunteer area" 
                            className="h-11 sm:h-12 text-sm sm:text-base" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                )}

                {/* Availability */}
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-1">
                      <FormLabel className="text-sm sm:text-base font-medium">Availability</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <Input 
                            placeholder="e.g., 3 hrs/week, Evenings only" 
                            className="pl-10 sm:pl-11 h-11 sm:h-12 text-sm sm:text-base" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                {/* Experience */}
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-1">
                      <FormLabel className="text-sm sm:text-base font-medium">Relevant experience or portfolio (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <Input 
                            placeholder="Links or brief description" 
                            className="pl-10 sm:pl-11 h-11 sm:h-12 text-sm sm:text-base" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Motivation */}
              <FormField
                control={form.control}
                name="motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base font-medium">Why would you like to volunteer with Thrive Link?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us about your motivation and what you hope to contribute..."
                        className="min-h-24 sm:min-h-28 resize-none text-sm sm:text-base leading-relaxed"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              {/* Consent */}
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 sm:p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm sm:text-base leading-relaxed cursor-pointer">
                        I agree to be contacted for volunteer opportunities
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="pt-2 sm:pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-thrive-blue hover:bg-blue-700 h-11 sm:h-12 text-sm sm:text-base font-medium"
                >
                  Apply Now
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccess}
        title="Thank You!"
        message="🙌 Thank you for applying to volunteer with Thrive Link! Our team will review your submission and get back to you shortly."
      />
    </>
  )
}

export default VolunteerForm