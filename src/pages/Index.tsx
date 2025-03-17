
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
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '../components/Layout';
import PageTransition from '../components/PageTransition';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const testimonials = [
    {
      quote: "Since adopting this solution, my students are more engaged and my post-class workload has dropped significantly.",
      author: "Dr. A. Sharma",
      title: "Competitive Exam Coach"
    },
    {
      quote: "The automated workflow has saved me hours every week. My students love the consistency of the materials.",
      author: "Prof. R. Mehta",
      title: "Online Educator"
    },
    {
      quote: "Beautiful, professional PDFs with minimal effort. A game-changer for my teaching business.",
      author: "Mrs. K. Patel",
      title: "YouTube Educator"
    }
  ];

  const features = [
    {
      icon: <Youtube className="h-8 w-8 text-red-500" />,
      title: "YouTube Integration",
      description: "Automatically detect when your live class ends and trigger the PDF creation process.",
      color: "bg-red-50"
    },
    {
      icon: <Upload className="h-8 w-8 text-blue-500" />,
      title: "Effortless File Collection",
      description: "Upload your PPTX files via Google Drive or directly through our platform.",
      color: "bg-blue-50"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Smart Conversion",
      description: "Our engine converts your PPTX into structured documents with perfect formatting.",
      color: "bg-yellow-50"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      title: "Human Review",
      description: "Quality assurance with our 'Human in Loop' review process before delivery.",
      color: "bg-green-50"
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
      color: "bg-indigo-100"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-purple-500" />,
      title: "Monthly Magazines",
      description: "Comprehensive notes perfect for exam preparation and reference.",
      color: "bg-purple-100"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Connect",
      description: "Link your YouTube channel and upload your presentation files."
    },
    {
      number: "02",
      title: "Convert",
      description: "Our system automatically processes your content into structured documents."
    },
    {
      number: "03",
      title: "Distribute",
      description: "Beautifully designed PDFs are delivered to your students on schedule."
    }
  ];

  const faqs = [
    {
      question: "How do I connect my YouTube channel?",
      answer: "Enter your channel ID during setup—our system automatically monitors uploads for 'Daily Current Affairs' content."
    },
    {
      question: "Can I upload PPTX files manually?",
      answer: "Absolutely! Use our user-friendly upload button if you prefer to add files directly from your device."
    },
    {
      question: "What types of documents will my students receive?",
      answer: "Your students will receive daily newsletters, weekly compilations, and monthly magazines, all designed for optimal learning."
    },
    {
      question: "Is there a limit to how many PDFs I can create?",
      answer: "Our plans are based on your needs. Contact us for custom solutions that scale with your teaching requirements."
    }
  ];

  return (
    <Layout showLogo={true}>
      <PageTransition>
        <div className="flex flex-col min-h-screen">
          {/* Hero Section */}
          <section className="container mx-auto px-4 py-16 md:py-24">
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
                  transition={{ duration: 0.6 }}
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
                <motion.p
                  className="text-lg text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Instantly convert your PPTX files into daily newsletters, weekly compilations, and monthly magazines—crafted to boost your students' revision.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
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
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative bg-gradient-to-tr from-primary/10 to-purple-100 rounded-2xl p-6">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-yellow-300 rounded-lg px-3 py-1 text-sm font-medium">
                    New
                  </div>
                  <img
                    src="/landing-assets/landing-featured.png"
                    alt="PDF newsletter example"
                    className="rounded-xl shadow-lg w-full"
                  />
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Automated PDF Generation</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Value Proposition */}
          <section className="bg-muted/30 py-16">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl font-bold mb-6">Streamline Your Content, Amplify Student Success</h2>
                <p className="text-lg text-muted-foreground">
                  Our platform is engineered specifically for educators who need to deliver consistent, high-quality notes. By integrating your YouTube channel and file uploads, we automate the tedious conversion process.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={`${feature.color} p-6 rounded-xl border border-muted transition-all hover:shadow-md`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="bg-white/80 rounded-full p-4 inline-block mb-4 shadow-sm">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-3">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process takes your content from YouTube and presentations to beautifully designed PDFs with minimal effort.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-muted hidden md:block"></div>
              
              <div className="grid grid-cols-1 gap-12">
                {steps.map((step, index) => (
                  <motion.div 
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-5 gap-6 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="md:col-span-2 text-right hidden md:block">
                      {index % 2 === 0 ? (
                        <div className="pr-10">
                          <div className="inline-block bg-primary text-white text-3xl font-bold rounded-full w-16 h-16 flex items-center justify-center mb-3">
                            {step.number}
                          </div>
                          <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      ) : <div></div>}
                    </div>
                    
                    <div className="md:col-span-1 flex justify-center md:block">
                      <div className="relative">
                        <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 text-lg">
                          {step.number}
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 md:text-left block md:hidden">
                      <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    
                    <div className="md:col-span-2 text-left hidden md:block">
                      {index % 2 === 1 ? (
                        <div className="pl-10">
                          <div className="inline-block bg-primary text-white text-3xl font-bold rounded-full w-16 h-16 flex items-center justify-center mb-3">
                            {step.number}
                          </div>
                          <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      ) : <div></div>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Document Types */}
          <section className="bg-gradient-to-tr from-muted/40 to-muted/10 py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-3">Tailored Documents for Every Need</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Whether it's daily highlights, weekly summaries, or comprehensive monthly materials, we've got you covered.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {documentTypes.map((doc, index) => (
                  <motion.div
                    key={index}
                    className={`${doc.color} p-8 rounded-xl border border-muted transition-all hover:shadow-lg`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="bg-white/90 rounded-full p-4 inline-block mb-4 shadow-sm">
                      {doc.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{doc.title}</h3>
                    <p className="text-muted-foreground">{doc.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Button 
                  onClick={() => navigate('/task')} 
                  size="lg" 
                  className="group"
                >
                  Start Creating Documents
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Trusted by Leading Educators</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join a growing community of live teachers who have revolutionized their workflow.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-muted/20 p-6 rounded-xl border border-muted transition-all hover:shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="text-5xl text-primary/30 font-serif mb-4">"</div>
                  <p className="text-lg mb-6">{testimonial.quote}</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-muted/30 py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Find answers to common questions about our platform.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index}
                    className="mb-6 last:mb-0"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="font-semibold text-xl mb-2">{faq.question}</div>
                    <p className="text-muted-foreground">{faq.answer}</p>
                    {index < faqs.length - 1 && <Separator className="mt-6" />}
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Button variant="outline">
                  View All FAQs
                </Button>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 py-16">
            <motion.div 
              className="bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl p-12 text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="bg-muted/30 py-12 mt-auto">
            <div className="container mx-auto px-4">
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
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Testimonials</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</a></li>
                    <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Contact</h4>
                  <ul className="space-y-2">
                    <li className="text-sm text-muted-foreground">Email: support@noteglider.com</li>
                    <li className="text-sm text-muted-foreground">Phone: +1 (555) 123-4567</li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-muted-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-muted-foreground mb-4 md:mb-0">
                  © {new Date().getFullYear()} NoteGlider. All rights reserved.
                </div>
                <div className="flex space-x-6">
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Cookies</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Index;
