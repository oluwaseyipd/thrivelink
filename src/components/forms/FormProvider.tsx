
import { createContext, useContext, useState, ReactNode } from "react"
import JoinCommunityForm from "./JoinCommunityForm"
import VolunteerForm from "./VolunteerForm"
import EmailPreview from "./EmailPreview"
import WelcomeEmailTemplate from "../emails/WelcomeEmailTemplate"
import ProposeEventForm from "./ProposeEventForm"

interface FormContextType {
  openJoinCommunityForm: () => void
  openProposeEventForm?: () => void
  openVolunteerForm: () => void
  openWelcomeEmailPreview: () => void
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

  const openJoinCommunityForm = () => setJoinCommunityFormOpen(true)
  const closeJoinCommunityForm = () => setJoinCommunityFormOpen(false)

  const openProposeEventForm = () => setProposeEventFormOpen(true)
  const closeProposeEventForm = () => setProposeEventFormOpen(false)

  const openVolunteerForm = () => setVolunteerFormOpen(true)
  const closeVolunteerForm = () => setVolunteerFormOpen(false)

  const openWelcomeEmailPreview = () => setWelcomeEmailPreviewOpen(true)
  const closeWelcomeEmailPreview = () => setWelcomeEmailPreviewOpen(false)

  return (
    <FormContext.Provider
      value={{
        openJoinCommunityForm,
        openProposeEventForm,
        openVolunteerForm,
        openWelcomeEmailPreview
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
    </FormContext.Provider>
  )
}
