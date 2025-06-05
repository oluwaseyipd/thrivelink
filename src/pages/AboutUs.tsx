
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import ThemeToggle from "@/components/ThemeToggle";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Heart, Rocket, Star, Users } from "lucide-react";
import { useFormContext } from '@/components/forms/FormProvider';
import team1 from '@/images/team/team-1.png';


const teammembers = [
  {
    id: 1,
    image:team1 ,
    name: "Abiola john oluwaseyi",
    post: "Founder & CEO",
    description: "Fullstack web developer passionate about creating pathways for underrepresented talent in tech.",
    twitter: "",
    instagram: "",
    inkedin: "",

  },
   {
    id: 2,
    image:team1 ,
    name: "Kolade Favour",
    post: "Social Manager",
    description: "Machine Learning engineer focused on building model that cause transformation.",
      twitter: "",
      instagram: "",
      linkedin: "",

  },
   {
    id: 3,
    image:team1 ,
    name: "Kolade Precious",
    post: "Graphic Designer",
    description: "A brand identity professional focused on elevating brands and bring them to spotlight.",
      twitter: "",
      instagram: "",
      linkedin: "",
  },
   {
    id: 4,
    image:team1 ,
    name: "Amole Temiloluwa",
    post: "Content Writer",
    description: "Career coach with expertise in helping professionals transition into tech careers.",
      twitter: "",
      instagram: "",
      linkedin: "",
  }
];




// Custom hook for animated counter
const useCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * (end - start) + start);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, start, duration]);

  return { count, ref: countRef };
};

// Counter component
const Counter = ({ end, suffix = '', duration = 2000, className = '' }) => {
  const { count, ref } = useCounter(end, duration);
  
  return (
    <div ref={ref} className={className}>
      {count}{suffix}
    </div>
  );
};



const AboutUs = () => {

    const { openJoinCommunityForm } = useFormContext();



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Fixed theme toggle button */}
      <div className="fixed bottom-6 right-6 z-50">{/* <ThemeToggle /> */}</div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Mission is to Help You{" "}
              <span className="text-thrive-blue">Thrive in Tech</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
              We're building a supportive community where aspiring tech
              professionals can connect, learn, and grow together on their
              journey to success.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
      </section>

      {/* Our Story Section */}
      <ScrollReveal>
        <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                The Story Behind Thrive
                <span className="text-thrive-blue"> Link</span>
              </h2>
              <div className="prose dark:prose-invert max-w-none text-lg text-gray-700 dark:text-gray-300">
                <p className="mb-4">
                  Thrive Link was born from a simple observation: talented
                  individuals with immense potential often struggle to break
                  into the tech industry due to lack of guidance, resources, and
                  support networks.
                </p>
                <p className="mb-4">
                  Our founders, experienced tech professionals themselves,
                  recognized this gap and envisioned a community-driven
                  solution. They believed that by connecting aspiring tech
                  professionals with mentors who have walked the same path, we
                  could create a powerful ecosystem of growth and opportunity.
                </p>
                <p className="mb-4">
                  Since our launch, we've been committed to four core
                  principles: meaningful mentorship, community building,
                  providing high-quality resources, and creating tangible
                  opportunities. We believe that with the right support, anyone
                  with dedication can thrive in the tech industry.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* What We Do Section */}
      <ScrollReveal delay={100}>
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                What We Do
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our comprehensive approach to supporting tech talent through
                every stage of their journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="mb-6 w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Users className="h-7 w-7 text-thrive-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Mentorship Programs
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect with experienced professionals who provide guidance,
                    feedback, and support tailored to your career goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="mb-6 w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Heart className="h-7 w-7 text-thrive-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Community Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Join our "Thrive Together" groups where members share
                    knowledge, collaborate on projects, and build lasting
                    connections.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="mb-6 w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Award className="h-7 w-7 text-thrive-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Bootcamps & Training
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Access intensive, focused learning experiences designed to
                    rapidly build in-demand skills and practical knowledge.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="mb-6 w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <BookOpen className="h-7 w-7 text-thrive-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Free Resources
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Explore our curated collection of tutorials, guides, and
                    learning materials to support your technical development.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="mb-6 w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Rocket className="h-7 w-7 text-thrive-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    Career Development
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get personalized career advice, resume reviews, interview
                    preparation, and job search strategies from industry
                    experts.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Vision & Mission Section */}
      <ScrollReveal delay={150}>
        <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-16">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="relative">
                  <div className="aspect-square bg-blue-600 rounded-full absolute -top-6 -left-6 w-64 h-64 opacity-10"></div>
                  <div className="bg-gradient-to-tr from-thrive-blue to-blue-400 p-1 rounded-lg shadow-xl relative z-10">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 md:p-12">
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                        Our Vision
                      </h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300">
                        To become the go-to ecosystem for raising the world's
                        next generation of tech professionals, creating a future
                        where talent and opportunity meet without barriers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="aspect-square bg-green-500 rounded-full absolute -bottom-6 -right-6 w-64 h-64 opacity-10"></div>
                  <div className="bg-gradient-to-tr from-thrive-green to-green-400 p-1 rounded-lg shadow-xl relative z-10">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 md:p-12">
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                        Our Mission
                      </h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300">
                        To empower aspiring tech professionals through
                        mentorship, community, resources, and opportunities,
                        ensuring everyone has the support they need to thrive in
                        the tech industry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Meet The Team Section */}
      <ScrollReveal delay={200}>
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Meet the Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                The passionate individuals behind Thrive Link dedicated to
                helping you succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teammembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={member.image} alt="Team 1" className="w-full" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-thrive-blue font-medium mb-3">
                      {member.post}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {member.description}
                    </p>
                  </div>

                  <div className="flex space-x-4 px-4 pb-5">
                    <a
                      href={member.twitter}
                      className="hover:text-gray-400 text-thrive-blue transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a
                      href={member.linkedin}
                      className="hover:text-gray-400 text-thrive-blue transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a
                      href={member.instagram}
                      className="hover:text-gray-400 text-thrive-blue transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-thrive-blue"
                      >
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Impact Section */}
      <ScrollReveal delay={250}>
        <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Impact So Far
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                While we're just getting started, we're already making a
                difference in the tech community.
              </p>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <Counter 
                end={500} 
                suffix="+"
                className="text-5xl font-bold text-blue-600 mb-2"
                duration={2500}
              />
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Community Members
              </p>
            </div>

            <div className="text-center">
              <Counter 
                end={50} 
                suffix="+"
                className="text-5xl font-bold text-blue-600 mb-2"
                duration={2000}
              />
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Active Mentors
              </p>
            </div>

            <div className="text-center">
              <Counter 
                end={85} 
                suffix="%"
                className="text-5xl font-bold text-blue-600 mb-2"
                duration={2200}
              />
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Member Success Rate
              </p>
            </div>
          </div>

            <div className="bg-blue-50 dark:bg-gray-700 p-8 rounded-xl max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 flex justify-center">
                  <div className="text-6xl text-thrive-blue">
                    <Star className="w-16 h-16" />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                    "Joining Thrive Link was a turning point in my career. The
                    mentorship and community support helped me land my first
                    developer role after just 6 months of focused learning."
                  </blockquote>
                  <div className="font-medium text-gray-900 dark:text-white">
                    — Jamie Rivera, Junior Developer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Join Us CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-thrive-blue to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of a community that's changing the face of tech. Whether
            you're looking for guidance or want to give back as a mentor,
            there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={openJoinCommunityForm}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Join the Community
            </Button>
            <Button
              size="lg"
              className="text-white border-white bg-blue-700 hover:bg-blue-600"
            >
              <Link to="/volunteer">Become a Mentor</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
