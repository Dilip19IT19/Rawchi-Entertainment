import { useState,useEffect } from 'react'
import { Menu, X, Play, Award, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css'

function App() {

  const NavLink = ({ href, children }) => (
    <a href={href} className="text-gray-300 hover:text-white transition-colors">
      {children}
    </a>
  );
  
  const ServiceCard = ({ title, description }) => (
    <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors">
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
  
  const TeamMember = ({ name, role, imageUrl }) => (
    <div className="text-center">
      <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full mb-4">
        <img 
          src="/api/placeholder/128/128" 
          alt={name} 
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="text-gray-300">{role}</p>
    </div>
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'portfolio', 'team', 'contact'];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact');
        return;
      }
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If section is in viewport (allowing for nav height)
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId.replace('#', ''));
    setIsMenuOpen(false);
  };
  
  const services = [
    {
      title: "Film Production",
      description: "Full-service film production, including story development, screenplay, direction, and post-production."
    },
    {
      title: "Music Video Production",
      description: "High-quality music videos for artists across genres, with a focus on innovative storytelling."
    },
    {
      title: "Animation and Graphics",
      description: "Custom animations and graphics for films, advertisements, and digital content."
    },
    {
      title: "Post-Production Services",
      description: "Comprehensive post-production, including editing, sound design, and color grading."
    }
  ];

  const team = [
    {
      name: "Ashok Suman",
      role: "Film Editor & Founder Rawchi Entertainment"
    },
    {
      name: "Priya Mishra",
      role: "Actor, Founder Zero Filmss Entertainment"
    },
    {
      name: "Raj Kumar Das",
      role: "Writer, Director and Founder Zero Filmss Entertainment"
    }
  ];

  const navigationItems = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <>
      
      
      <div className=' h-screen w-full'>

        

        <div className="min-h-screen bg-gray-900">
          {/* Navigation */}
          <nav className="bg-gray-800 fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center"
                >
                  <div className="text-white text-xl font-bold">Rawchi Entertainment</div>
                </motion.div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:block">
                  <div className="flex items-center space-x-4">
                    {navigationItems.map(({ href, label }) => (
                      <a
                       
                        key={href}
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.querySelector(href);
                          element?.scrollIntoView({ behavior: 'smooth' });
                          handleNavClick(href);
                        }}
                        className={`transition-colors ${
                          activeSection === href.replace('#', '')
                            ? 'text-red-500 font-medium'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-300 hover:text-white"
                  >
                    {isMenuOpen ? <X /> : <Menu />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}

            <AnimatePresence>
            
            {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {['home', 'services', 'portfolio', 'team', 'contact'].map((section) => (
                      <a
                       
                        key={section}
                        href={`#${section}`}
                        className={`block px-3 py-2 transition-colors ${
                          activeSection === section
                            ? 'text-red-500 font-medium'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
            
          </nav>

          {/* Hero Section */}
          <section id="home" className="pt-16">
            <div className="relative h-screen flex items-center justify-center text-center">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <motion.img
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                src="src/assets/heroimage.jpeg"
                alt="Hero Background"
                className="absolute inset-0 w-full h-full  object-contain"
              />
              <div className="relative z-10 max-w-3xl mx-auto px-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Crafting Cinematic Magic
                </motion.h1>
                <motion.p
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.7 }}
                  className="text-xl text-gray-200 mb-8">
                  Collaborating to Create Unforgettable Experiences
                </motion.p>
                {/* <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors flex items-center mx-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Showreel
                </motion.button> */}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            id="portfolio" className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Our Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="relative group">
                  <img
                    src="/api/placeholder/400/300"
                    alt="The Future Is Dark"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">The Future Is Dark</h3>
                  </div>
                </div>
                <div className="relative group">
                  <img
                    src="/api/placeholder/400/300"
                    alt="A Drop of Water"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">A Drop of Water</h3>
                  </div>
                </div>

                <div className="relative group">
                  <img
                    src="/api/placeholder/400/300"
                    alt="The reel & real life of Wasseypur"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">The reel & real life of Wasseypur </h3>
                  </div>
                </div>

                <div className="relative group">
                  <img
                    src="/api/placeholder/400/300"
                    alt=" Meruthiya Gangsters"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold"> Meruthiya Gangsters</h3>
                  </div>
                </div>

                <div className="relative group">
                  <img
                    src="/api/placeholder/400/300"
                    alt="Family of Thakurgang"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">Family of Thakurgang</h3>
                  </div>
                </div>

                <div className="relative group">
                  <img
                    src="/api/placeholder/400/300"
                    alt="Shukla The Terror "
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold"> Shukla The Terror </h3>
                  </div>
                </div>

                <div className="relative group">
                  <img
                    src="/api/placeholder/400/300"
                    alt="Fair and handsome"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">Fair and handsome </h3>
                  </div>
                </div>

                <div className="relative group">
                  <img
                    src="/api/placeholder/400/300"
                    alt="Zhandu balm"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">Zhandu balm</h3>
                  </div>
                </div>

                <div className="relative group">
                  <img
                    src="/api/placeholder/400/300"
                    alt="The Lost Childhood"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">The Lost Childhood</h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Awards Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white text-center mb-12">International Recognition</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Canadian Labour International Short Film Festival 2017",
                  "San Mauro International Film Festival 2018",
                  "Dada Saheb Phalke International Film Festival 2019"
                ].map((award, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
                    <Award className="text-yellow-500 w-8 h-8" />
                    <span className="text-white">{award}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Team Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            id="team" className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                  <TeamMember key={index} {...member} />
                ))}
              </div>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            id="contact" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Head Office</h3>
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-red-500 w-6 h-6 mt-1" />
                    <p className="text-gray-300">
                      Snehi A7, Four Bungalow Andheri West, Mumbai, Pin - 400053
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="text-red-500 w-6 h-6" />
                    <p className="text-gray-300">+91-9833076450, 6207203662</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="text-red-500 w-6 h-6" />
                    <p className="text-gray-300">raajraj69@gmail.com</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Working Office</h3>
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-red-500 w-6 h-6 mt-1" />
                    <p className="text-gray-300">
                      10th Mile Near Amba Toli Hazam Road, Ranchi, Jharkhand - 835221
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="text-red-500 w-6 h-6" />
                    <p className="text-gray-300">+91-6207203662</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="text-red-500 w-6 h-6" />
                    <p className="text-gray-300">ashoksuman1972@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center text-gray-400">
                <p>© 2024 Rawchi Entertainment. All rights reserved.</p>
              </div>
            </div>
          </motion.footer>
        </div>
      </div>
      
    </>
  )
}

export default App
