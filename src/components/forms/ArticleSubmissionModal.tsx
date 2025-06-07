import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Modal from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { FileText, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  content: z.string().min(100, "Content must be at least 100 characters long"),
  authorName: z.string().min(2, "Author name must be at least 2 characters long"),
  authorEmail: z.string().email("Please enter a valid email address"),
  authorBio: z.string().optional(),
  tags: z.string().optional(),
})

type ArticleFormData = z.infer<typeof articleSchema>

interface ArticleSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
}

const ArticleSubmissionModal = ({ isOpen, onClose }: ArticleSubmissionModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      content: "",
      authorName: "",
      authorEmail: "",
      authorBio: "",
      tags: "",
    },
  })

  const categories = [
    { value: "learning-paths", label: "Learning Paths" },
    { value: "tutorials", label: "Tutorials" },
    { value: "tools", label: "Tools" },
    { value: "career", label: "Career Advice" },
    { value: "industry-insights", label: "Industry Insights" },
    { value: "best-practices", label: "Best Practices" },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        })
        return
      }
      setAttachedFile(file)
    }
  }

  const removeFile = () => {
    setAttachedFile(null)
    const fileInput = document.getElementById('file-upload') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const onSubmit = async (data: ArticleFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log("Article submission data:", data)
      console.log("Attached file:", attachedFile)
      
      toast({
        title: "Article submitted successfully!",
        description: "Thank you for your submission. We'll review it and get back to you within 48 hours.",
      })
      
      form.reset()
      setAttachedFile(null)
      onClose()
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full max-w-4xl mx-4 sm:mx-6 lg:mx-auto max-h-[95vh] overflow-y-auto">
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Header */}
        <div className="text-center border-b pb-4 sm:pb-6">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-thrive-blue" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Submit an Article
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Share your knowledge with the ThriveMe community
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Article Title *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your article title" 
                          className="text-sm sm:text-base h-10 sm:h-11"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Category *</FormLabel>
                      <FormControl>
                        <select 
                          {...field}
                          className="flex h-10 sm:h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm sm:text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Short Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of your article (20-150 characters)"
                          className="resize-none text-sm sm:text-base min-h-[80px] sm:min-h-[90px]"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Tags (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="React, JavaScript, Career, etc." 
                          className="text-sm sm:text-base h-10 sm:h-11"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                <FormField
                  control={form.control}
                  name="authorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Author Name *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
                          className="text-sm sm:text-base h-10 sm:h-11"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="authorEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Author Email *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your.email@example.com" 
                          className="text-sm sm:text-base h-10 sm:h-11"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="authorBio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">Author Bio (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief bio about yourself"
                          className="resize-none text-sm sm:text-base min-h-[80px] sm:min-h-[90px]"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                {/* File Upload */}
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Attachments (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.md"
                      onChange={handleFileUpload}
                    />
                    {!attachedFile ? (
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="text-center">
                          <Upload className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                          <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            Upload article draft or files
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            PDF, DOC, DOCX, TXT, MD (max 10MB)
                          </p>
                        </div>
                      </label>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                          <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 truncate">
                            {attachedFile.name}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="ml-2 flex-shrink-0"
                        >
                          <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Full Width Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm sm:text-base">Article Content *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your article content here... (minimum 100 characters)"
                      className="resize-none text-sm sm:text-base min-h-[120px] sm:min-h-[200px]"
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            {/* Guidelines */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 text-sm sm:text-base">
                Submission Guidelines
              </h4>
              <ul className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Articles should be original and provide value to the tech community</li>
                <li>• Include practical examples, code snippets, or real-world applications</li>
                <li>• Ensure content is well-structured with clear headings and sections</li>
                <li>• We review all submissions within 48 hours and will contact you via email</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-11 sm:h-12 text-sm sm:text-base"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-thrive-blue hover:bg-blue-700 h-11 sm:h-12 text-sm sm:text-base"
              >
                {isSubmitting ? "Submitting..." : "Submit Article"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}

export default ArticleSubmissionModal;