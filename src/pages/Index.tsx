
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Shield, Zap, LineChart, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '../components/Layout';
import PageTransition from '../components/PageTransition';

const Index = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { number: '+20', label: 'Markdown formats supported', color: 'bg-yellow-200' },
    { number: '+63%', label: 'Rendering performance', color: 'bg-green-200' },
    { number: '80%', label: 'Development time reduction', color: 'bg-pink-200' }
  ];

  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'PDF SDK for document creation, editing, and conversion',
      description: 'Transform your markdown documents into beautifully designed PDF newsletters with our powerful generation engine.',
      color: 'bg-green-100',
      image: '/placeholder.svg'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Integrate secure MD5 document solutions',
      description: 'Ensure your documents are secure and can be verified with built-in MD5 hash verification for document integrity.',
      color: 'bg-orange-100',
      image: '/placeholder.svg'
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Automate and track complex workflows',
      description: 'Streamline your document generation process with automated workflows and comprehensive tracking.',
      color: 'bg-purple-100',
      image: '/placeholder.svg'
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: 'Leverage modern cloud-based document processing',
      description: 'Take advantage of cloud infrastructure to process documents at scale with reliable performance.',
      color: 'bg-yellow-100',
      image: '/placeholder.svg'
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
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Building blocks to accelerate your digital transformation
                </motion.h1>
                <motion.p 
                  className="text-xl text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Transform your markdown documents into beautifully designed PDF newsletters with NoteGlider.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Button 
                    onClick={() => navigate('/task')} 
                    size="lg" 
                    className="group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl p-2">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-yellow-300 rounded-lg px-3 py-1 text-sm font-medium">
                    Featured
                  </div>
                  <img
                    src={"/lovable-uploads/4bd857ff-8afc-411b-a3e4-9d2ce81bedbe.png"}
                    alt="Newsletter preview"
                    className="rounded-xl shadow-lg w-full"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Testimonial */}
          <section className="bg-muted/30 py-12">
            <div className="container mx-auto px-4 text-center">
              <blockquote className="text-xl font-medium">
                "Thank you for introducing us to NoteGlider!"
              </blockquote>
              <div className="mt-4 text-sm text-muted-foreground">
                - Trusted by thousands of content creators worldwide
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="container mx-auto px-4 py-16">
            <div className="space-y-16">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={`p-8 rounded-2xl ${feature.color}`}>
                    <div className="bg-white/80 rounded-xl p-4 inline-block mb-4">
                      {feature.icon}
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <Button variant="outline" className="group">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                  <div className="bg-muted/30 rounded-2xl p-6 flex items-center justify-center">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="max-h-64 rounded-lg" 
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`${stat.color} p-6 rounded-xl text-center`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="bg-muted/30 rounded-2xl p-8 mb-16">
              <h3 className="text-2xl font-bold mb-4">Build faster. Scale smarter.</h3>
              <p className="text-muted-foreground mb-8">
                Our document processing engine helps you create beautiful PDFs from Markdown in seconds, not minutes.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-10 h-1 bg-primary mb-3"></div>
                    <p className="text-sm">Feature {item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Sections */}
          <section className="container mx-auto px-4 py-8">
            <div className="bg-pink-100 rounded-2xl p-8 mb-16 flex flex-col md:flex-row justify-between items-center">
              <h3 className="text-xl font-medium mb-4 md:mb-0">Want to use NoteGlider in your web app today?</h3>
              <Button>Contact Sales</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-4">Process without the paper</h3>
                <p className="text-muted-foreground mb-6">
                  Go paperless and streamline your document workflow with our digital transformation tools.
                </p>
                <Button variant="outline" className="group">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <div className="bg-muted/30 rounded-2xl p-6">
                <img src="/placeholder.svg" alt="Paperless process" className="w-full" />
              </div>
            </div>

            <div className="bg-green-100 rounded-2xl p-8 mb-16 flex flex-col md:flex-row justify-between items-center">
              <h3 className="text-xl font-medium mb-4 md:mb-0">Interested in automating your workflow?</h3>
              <Button>Get a Demo</Button>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8">Seamless document technology within NoteGlider</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['yellow', 'pink', 'green', 'blue'].map((color, index) => (
                  <div key={index} className={`bg-${color}-100 p-6 rounded-xl`}>
                    <div className="font-medium">Feature {index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Section */}
          <section className="container mx-auto px-4 py-8 mb-16">
            <h2 className="text-3xl font-bold mb-8">Why NoteGlider?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-muted/30 p-6 rounded-xl">
                <ArrowRight className="mb-4 h-6 w-6" />
                <h3 className="text-lg font-medium mb-2">Markdown Simplicity</h3>
                <p className="text-sm text-muted-foreground">
                  Write your content in Markdown and let us handle the conversion to beautiful PDFs.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-xl">
                <FileText className="mb-4 h-6 w-6" />
                <h3 className="text-lg font-medium mb-2">Custom Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Choose from a variety of professional templates or create your own.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-xl">
                <LineChart className="mb-4 h-6 w-6" />
                <h3 className="text-lg font-medium mb-2">Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Track document performance and user engagement.
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-muted/30 py-12 mt-auto">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="text-2xl font-medium tracking-tight mb-4 md:mb-0">
                  <span className="font-bold">note</span>
                  <span className="text-primary">glider</span>
                </div>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm">About</Button>
                  <Button variant="ghost" size="sm">Features</Button>
                  <Button variant="ghost" size="sm">Pricing</Button>
                  <Button variant="ghost" size="sm">Contact</Button>
                </div>
              </div>
              <div className="border-t border-muted-foreground/20 pt-8 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} NoteGlider. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Index;
