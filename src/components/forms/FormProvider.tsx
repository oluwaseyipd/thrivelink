
import { createContext, useContext, useState, ReactNode } from "react"
import JoinCommunityForm from "./JoinCommunityForm"
import VolunteerForm from "./VolunteerForm"
import EmailPreview from "./EmailPreview"
import WelcomeEmailTemplate from "../emails/WelcomeEmailTemplate"
import ProposeEventForm from "./ProposeEventForm"
import TestimonialSubmissionForm from "./TestimonialSubmissionForm "
import VideoTestimonialUploadModal from "./VideoTestimonialUploadModal"
import ArticleSubmissionModal from "./ArticleSubmissionModal"
import CareerSupportForm from "./CareerSupportForm"
import MentorshipApplicationForm from "./MentorshipApplicationForm"


interface FormContextType {
  openJoinCommunityForm: () => void
  openProposeEventForm?: () => void
  openVolunteerForm: () => void
  openWelcomeEmailPreview: () => void
  openTestimonialSubmissionForm?: () => void
  openVideoTestimonialUploadModal?: () => void
  openArticleSubmissionModal?: () => void
  openCareerSupportForm?: () => void
  openMentorshipApplicationForm?: () => void
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}

interface FormProviderProps {
  children: ReactNode
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [joinCommunityFormOpen, setJoinCommunityFormOpen] = useState(false)
  const [proposeEventFormOpen, setProposeEventFormOpen] = useState(false)
  const [volunteerFormOpen, setVolunteerFormOpen] = useState(false)
  const [welcomeEmailPreviewOpen, setWelcomeEmailPreviewOpen] = useState(false)
  const [testimonialSubmissionFormOpen, setTestimonialSubmissionFormOpen] = useState(false)
  const [videoTestimonialUploadModalOpen, setVideoTestimonialUploadModalOpen] = useState(false)
  const [articleSubmissionModalOpen, setArticleSubmissionModalOpen] = useState(false)
  const [careerSupportFormOpen, setCareerSupportFormOpen] = useState(false)
  const [mentorshipApplicationFormOpen, setMentorshipApplicationFormOpen] = useState(false)



  const openJoinCommunityForm = () => setJoinCommunityFormOpen(true)
  const closeJoinCommunityForm = () => setJoinCommunityFormOpen(false)

  const openProposeEventForm = () => setProposeEventFormOpen(true)
  const closeProposeEventForm = () => setProposeEventFormOpen(false)

  const openVolunteerForm = () => setVolunteerFormOpen(true)
  const closeVolunteerForm = () => setVolunteerFormOpen(false)

  const openWelcomeEmailPreview = () => setWelcomeEmailPreviewOpen(true)
  const closeWelcomeEmailPreview = () => setWelcomeEmailPreviewOpen(false)

  const openTestimonialSubmissionForm = () => setTestimonialSubmissionFormOpen(true)
  const closeTestimonialSubmissionForm = () => setTestimonialSubmissionFormOpen(false)

  const openVideoTestimonialUploadModal = () => setVideoTestimonialUploadModalOpen(true)
  const closeVideoTestimonialUploadModal = () => setVideoTestimonialUploadModalOpen(false)

  const openArticleSubmissionModal = () => setArticleSubmissionModalOpen(true)
  const closeArticleSubmissionModal = () => setArticleSubmissionModalOpen(false)

  const openCareerSupportForm = () => setCareerSupportFormOpen(true)
  const closeCareerSupportForm = () => setCareerSupportFormOpen(false)

  const openMentorshipApplicationForm = () => setMentorshipApplicationFormOpen(true)
  const closeMentorshipApplicationForm = () => setMentorshipApplicationFormOpen(false)

  

  return (
    <FormContext.Provider
      value={{
        openJoinCommunityForm,
        openProposeEventForm,
        openVolunteerForm,
        openWelcomeEmailPreview,
        openTestimonialSubmissionForm,
        openVideoTestimonialUploadModal,
        openArticleSubmissionModal,
        openCareerSupportForm,
        openMentorshipApplicationForm,
      }}
    >
      {children}
      <JoinCommunityForm 
        isOpen={joinCommunityFormOpen} 
        onClose={closeJoinCommunityForm} 
      />
      <ProposeEventForm 
        isOpen={proposeEventFormOpen} 
        onClose={closeProposeEventForm} 
      />
      <VolunteerForm 
        isOpen={volunteerFormOpen} 
        onClose={closeVolunteerForm} 
      />
      <EmailPreview
        isOpen={welcomeEmailPreviewOpen}
        onClose={closeWelcomeEmailPreview}
        subject="🎉 Welcome to Thrive Link – Let's Grow Together!"
        emailComponent={<WelcomeEmailTemplate firstName="John" />}
      />

      <TestimonialSubmissionForm 
        isOpen={testimonialSubmissionFormOpen} 
        onClose={closeTestimonialSubmissionForm} 
      />

      <VideoTestimonialUploadModal 
        isOpen={videoTestimonialUploadModalOpen} 
        onClose={closeVideoTestimonialUploadModal} 
      />

      <ArticleSubmissionModal 
        isOpen={articleSubmissionModalOpen} 
        onClose={closeArticleSubmissionModal} 
      />

      <CareerSupportForm 
        isOpen={careerSupportFormOpen} 
        onClose={closeCareerSupportForm} 
      />
      <MentorshipApplicationForm 
        isOpen={mentorshipApplicationFormOpen} 
        onClose={closeMentorshipApplicationForm} 
      />
    </FormContext.Provider>
  )
}
