
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Youtube, 
  FileText, 
  Zap, 
  Clock, 
  CheckCircle, 
  Monitor, 
  Upload, 
  CalendarDays, 
  BookOpen, 
  Calendar,
  Bookmark,
  MessagesSquare,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import Navbar from '@/components/Navbar';
import ScrollRevealSection from '@/components/ScrollRevealSection';
import StorySection from '@/components/StorySection';
import FeatureCard from '@/components/FeatureCard';
import HeroGradient from '@/components/HeroGradient';
import TestimonialCard from '@/components/TestimonialCard';
import FAQItem from '@/components/FAQItem';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Youtube className="h-8 w-8 text-red-500" />,
      title: "YouTube Integration",
      description: "Automatically detect when your live class ends and trigger the PDF creation process.",
      color: "bg-red-50 dark:bg-red-950/20"
    },
    {
      icon: <Upload className="h-8 w-8 text-blue-500" />,
      title: "Effortless File Collection",
      description: "Upload your PPTX files via Google Drive or directly through our platform.",
      color: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Smart Conversion",
      description: "Our engine converts your PPTX into structured documents with perfect formatting.",
      color: "bg-yellow-50 dark:bg-yellow-950/20"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-green-500" />,
      title: "AI Enhancement",
      description: "Advanced AI algorithms improve document structure and readability automatically.",
      color: "bg-green-50 dark:bg-green-950/20"
    }
  ];

  const documentTypes = [
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Daily Newsletters",
      description: "Quick, up-to-date highlights for immediate post-class revision.",
      color: "bg-primary/10"
    },
    {
      icon: <Calendar className="h-10 w-10 text-indigo-500" />,
      title: "Weekly Compilations",
      description: "Summaries to reinforce weekly lessons and track progress.",
      color: "bg-indigo-100 dark:bg-indigo-950/30"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-purple-500" />,
      title: "Monthly Magazines",
      description: "Comprehensive notes perfect for exam preparation and reference.",
      color: "bg-purple-100 dark:bg-purple-950/30"
    }
  ];

  const testimonials = [
    {
      quote: "Since adopting this solution, my students are more engaged and my post-class workload has dropped significantly.",
      author: "Dr. A. Sharma",
      title: "Competitive Exam Coach",
      rating: 5
    },
    {
      quote: "The automated workflow has saved me hours every week. My students love the consistency of the materials.",
      author: "Prof. R. Mehta",
      title: "Online Educator",
      rating: 5
    },
    {
      quote: "Beautiful, professional PDFs with minimal effort. A game-changer for my teaching business.",
      author: "Mrs. K. Patel",
      title: "YouTube Educator",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How do I connect my YouTube channel?",
      answer: "Simply enter your channel ID during setup. Our system will automatically monitor your channel for new uploads tagged with 'Daily Current Affairs' content and process them accordingly.",
      value: "item-1"
    },
    {
      question: "Can I upload PPTX files manually?",
      answer: "Absolutely! You can use our user-friendly upload button to add files directly from your device if you prefer not to use the automatic YouTube integration.",
      value: "item-2"
    },
    {
      question: "What types of documents will my students receive?",
      answer: "Your students will receive daily newsletters for immediate post-class revision, weekly compilations to reinforce lessons, and monthly magazines that serve as comprehensive study materials—all designed for optimal learning.",
      value: "item-3"
    },
    {
      question: "Is there a limit to how many PDFs I can create?",
      answer: "Our plans are based on your specific needs. We offer flexible options that scale with your teaching requirements. Contact our sales team for custom solutions tailored to your workflow.",
      value: "item-4"
    },
    {
      question: "How long does it take to generate a PDF?",
      answer: "Most PDFs are generated within minutes of your class ending or file upload. The exact time depends on the document's complexity and length, but our system is optimized for quick processing.",
      value: "item-5"
    }
  ];

  return (
    <Layout showLogo={false}>
      <PageTransition>
        <Navbar />
        
        {/* Hero Section with Gradient Background */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          <HeroGradient />
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <motion.div 
                  className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-medium mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  For Live Educators
                </motion.div>
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Effortless PDF Creation for Live Educators
                </motion.h1>
                <motion.p 
                  className="text-xl text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Transform your YouTube live classes into beautifully designed study materials without the hassle.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Button 
                    onClick={() => navigate('/task')} 
                    size="lg" 
                    className="group"
                  >
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="outline" size="lg">
                    See How It Works
                  </Button>
                </motion.div>
              </div>
              
              <motion.div
                className="relative hidden lg:block"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative bg-gradient-to-tr from-primary/5 to-purple-100/30 dark:from-primary/10 dark:to-purple-800/10 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-yellow-300 rounded-lg px-3 py-1 text-sm font-medium shadow-sm">
                    New
                  </div>
                  <img
                    src="/landing-assets/landing-featured.png"
                    alt="PDF newsletter example"
                    className="rounded-xl shadow-lg w-full"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Automated PDF Generation</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
            <motion.div 
              className="w-1 h-10 bg-gradient-to-b from-primary to-transparent rounded-full"
              animate={{ 
                height: [10, 30, 10],
                opacity: [0.2, 1, 0.2]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </motion.div>
        </section>

        {/* Features Section */}
        <StorySection
          id="features"
          title="Transform Your Teaching Workflow"
          subtitle="Features"
          description="Our platform is engineered specifically for educators who need to deliver consistent, high-quality notes to their students."
          className="bg-muted/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </StorySection>

        {/* How It Works Section */}
        <section id="howItWorks" className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollRevealSection className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-primary font-medium mb-2">Process</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                Our streamlined process takes your content from YouTube and presentations to beautifully designed PDFs with minimal effort.
              </p>
            </ScrollRevealSection>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full hidden md:block"></div>
              
              <div className="space-y-20 md:space-y-32">
                <ScrollRevealSection className="md:grid md:grid-cols-5 gap-6 relative items-center">
                  <div className="md:col-span-2 mb-6 md:mb-0">
                    <div className="md:pr-10 text-center md:text-right">
                      <div className="inline-flex items-center justify-center bg-primary text-primary-foreground text-3xl font-bold rounded-full w-16 h-16 mb-4">
                        01
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">Connect</h3>
                      <p className="text-muted-foreground">Link your YouTube channel and upload your presentation files.</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 flex justify-center">
                    <div className="relative">
                      <div className="bg-background border-4 border-primary rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-lg">
                        <Youtube className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <img 
                      src="/landing-assets/landing-1.png" 
                      alt="Connect your YouTube channel" 
                      className="rounded-xl shadow-lg w-full border border-border"
                    />
                  </div>
                </ScrollRevealSection>
                
                <ScrollRevealSection className="md:grid md:grid-cols-5 gap-6 relative items-center">
                  <div className="md:col-span-2 order-1 md:order-3 mb-6 md:mb-0">
                    <div className="md:pl-10 text-center md:text-left">
                      <div className="inline-flex items-center justify-center bg-primary text-primary-foreground text-3xl font-bold rounded-full w-16 h-16 mb-4">
                        02
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">Convert</h3>
                      <p className="text-muted-foreground">Our system automatically processes your content into structured documents.</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 order-2 flex justify-center">
                    <div className="relative">
                      <div className="bg-background border-4 border-primary rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-lg">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 order-3 md:order-1">
                    <img 
                      src="/landing-assets/landing-2.png" 
                      alt="Smart conversion process" 
                      className="rounded-xl shadow-lg w-full border border-border"
                    />
                  </div>
                </ScrollRevealSection>
                
                <ScrollRevealSection className="md:grid md:grid-cols-5 gap-6 relative items-center">
                  <div className="md:col-span-2 mb-6 md:mb-0">
                    <div className="md:pr-10 text-center md:text-right">
                      <div className="inline-flex items-center justify-center bg-primary text-primary-foreground text-3xl font-bold rounded-full w-16 h-16 mb-4">
                        03
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">Distribute</h3>
                      <p className="text-muted-foreground">Beautifully designed PDFs are delivered to your students on schedule.</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-1 flex justify-center">
                    <div className="relative">
                      <div className="bg-background border-4 border-primary rounded-full w-12 h-12 flex items-center justify-center z-10 shadow-lg">
                        <Bookmark className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <img 
                      src="/landing-assets/landing-3.png" 
                      alt="Distribute to students" 
                      className="rounded-xl shadow-lg w-full border border-border"
                    />
                  </div>
                </ScrollRevealSection>
              </div>
            </div>
          </div>
        </section>

        {/* Document Types */}
        <StorySection
          title="Tailored Documents for Every Need"
          subtitle="Document Types"
          description="Whether it's daily highlights, weekly summaries, or comprehensive monthly materials, we've got you covered."
          className="bg-gradient-to-tr from-muted/40 to-muted/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {documentTypes.map((doc, index) => (
              <FeatureCard
                key={index}
                icon={doc.icon}
                title={doc.title}
                description={doc.description}
                color={doc.color}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              onClick={() => navigate('/task')} 
              size="lg" 
              className="group"
            >
              Start Creating Documents
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </StorySection>

        {/* Testimonials */}
        <section id="testimonials" className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollRevealSection className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-primary font-medium mb-2">Testimonials</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by Leading Educators</h2>
              <p className="text-lg text-muted-foreground">
                Join a growing community of live teachers who have revolutionized their workflow.
              </p>
            </ScrollRevealSection>
            
            <ScrollRevealSection className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  title={testimonial.title}
                  rating={testimonial.rating}
                  delay={index * 0.1}
                />
              ))}
            </ScrollRevealSection>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollRevealSection className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-primary font-medium mb-2">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about our platform.
              </p>
            </ScrollRevealSection>
            
            <ScrollRevealSection className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    value={faq.value}
                  />
                ))}
              </Accordion>
            </ScrollRevealSection>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollRevealSection>
              <div className="bg-gradient-to-tr from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/5 rounded-2xl p-12 text-center max-w-4xl mx-auto backdrop-blur-sm border border-primary/10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Transform Your Teaching Workflow Today</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Empower your students with study materials that are as dynamic and engaging as your live classes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/task')} 
                    size="lg" 
                    className="group"
                  >
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </ScrollRevealSection>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted/30 py-12 mt-auto">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-2xl font-medium tracking-tight mb-4">
                  <span className="font-bold">note</span>
                  <span className="text-primary">glider</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Streamlining content creation for educators worldwide.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                  <li><a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a></li>
                  <li><a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li className="text-sm text-muted-foreground">Email: support@noteglider.com</li>
                  <li className="text-sm text-muted-foreground">Phone: +1 (555) 123-4567</li>
                </ul>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-muted-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-muted-foreground mb-4 md:mb-0">
                © {new Date().getFullYear()} NoteGlider. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </PageTransition>
    </Layout>
  );
};

export default Index;
