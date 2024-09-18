'use client'

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Upload, Search, UserCheck, ChevronRight, Star, Users, Brain, Zap, Link, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-800 to-gray-200 text-white overflow-hidden">
            <motion.div
                className="fixed inset-0 bg-[url('/subtle-pattern.png')] opacity-5"
                style={{ y: backgroundY }}
            />
            <div className="relative z-10">
                <Header />
                <main>
                    <HeroSection />
                    <KeyFeaturesSection />
                    <HowItWorksSection />
                    <MetricsSection />
                    <TestimonialsSection />
                    <IntegrationSection />
                    <FAQSection />
                </main>
                <Footer />
            </div>
        </div>
    );
}

function Header() {
    return (
        <header className="py-6 px-4 md:px-6 lg:px-8 bg-blue-900 bg-opacity-50 backdrop-blur-md">
            <nav className="flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-white">Evalia</a>
                <ul className="flex space-x-6">
                    <li><a href="#features" className="text-gray-300 hover:text-teal-400 transition-all duration-300">Features</a></li>
                    <li><a href="#how-it-works" className="text-gray-300 hover:text-teal-400 transition-all duration-300">How It Works</a></li>
                    <li><a href="#testimonials" className="text-gray-300 hover:text-teal-400 transition-all duration-300">Testimonials</a></li>
                    <li><a href="#faq" className="text-gray-300 hover:text-teal-400 transition-all duration-300">FAQ</a></li>
                </ul>
            </nav>
        </header>
    );
}

function HeroSection() {
    return (
        <section className="py-20 px-4 md:px-6 lg:px-8 flex items-center bg-gradient-to-r from-blue-800 to-teal-700">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
                <div className="text-center mb-10 md:mb-0">
                    <motion.h1
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Unlock the Power of AI in Hiring
                    </motion.h1>
                    <motion.p
                        className="text-xl max-w-4xl mx-auto md:text-2xl mb-10 text-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Transform your recruitment process with Evalia&apos;s cutting-edge AI technology. Streamline candidate evaluation and make data-driven hiring decisions.
                    </motion.p>
                    <motion.button
                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-lg font-semibold text-white shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 165, 0, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Get Started
                    </motion.button>
                </div>
                {/* <div className="md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Image src="/ai-illustration.svg" alt="AI-powered hiring" width={500} height={500} />
                    </motion.div>
                </div> */}
            </div>
        </section>
    );
}

function KeyFeaturesSection() {
    const features = [
        {
            title: 'AI-Powered Resume Evaluation',
            icon: <Brain className="w-12 h-12" />,
            description: 'Our advanced AI analyzes resumes with incredible accuracy, identifying top candidates based on skills, experience, and job fit. Save hours of manual screening and uncover hidden talent effortlessly.'
        },
        {
            title: 'Streamlined Candidate Pipeline',
            icon: <Users className="w-12 h-12" />,
            description: 'Manage your entire hiring process in one place. From application to offer, our intuitive platform keeps everything organized, allowing your team to collaborate seamlessly and make decisions faster.'
        },
        {
            title: 'Automated Smart Interviews',
            icon: <MessageCircle className="w-12 h-12" />,
            description: 'Conduct initial screenings with AI-assisted interviews. Our platform generates personalized questions based on each candidate\'s profile, ensuring a thorough and efficient first-round evaluation.'
        }
    ];

    return (
        <section id="features" className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-teal-800 to-blue-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="text-teal-400 mb-4">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold mb-2 text-white">{feature.title}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}


function HowItWorksSection() {
    const steps = [
        { title: 'Upload Resumes', icon: <Upload className="w-12 h-12" />, description: 'Simply upload candidate resumes to our secure platform. We support various file formats for your convenience.' },
        { title: 'AI Evaluation', icon: <Search className="w-12 h-12" />, description: 'Our advanced AI analyzes each resume, considering skills, experience, and job requirements to provide comprehensive insights.' },
        { title: 'Candidate Shortlisting', icon: <UserCheck className="w-12 h-12" />, description: 'Review AI-generated shortlists and make informed decisions. Collaborate with your team to select the best candidates efficiently.' },
    ];

    return (
        <section id="how-it-works" className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-teal-800">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">How It Works</h2>
                <div className="space-y-16">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center space-x-6"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.3 }}
                        >
                            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                {step.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2 text-white">{step.title}</h3>
                                <p className="text-gray-300">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MetricsSection() {
    const metrics = [
        { value: '60%', label: 'Faster Hiring Times' },
        { value: '85%', label: 'Improved Accuracy' },
        { value: '40%', label: 'Cost Reduction' },
        { value: '95%', label: 'Client Satisfaction' },
    ];

    return (
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-teal-800 to-blue-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Our Impact</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="text-5xl font-bold text-teal-400 mb-2">{metric.value}</div>
                            <div className="text-xl text-gray-300">{metric.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialsSection() {
    const testimonials = [
        { quote: "Evalia has revolutionized our hiring process. We've saved countless hours and found amazing talent.", author: "Jane Doe", role: "CEO of TechCorp", avatar: "/avatar1.png" },
        { quote: "The AI-powered insights have been a game-changer for our recruitment team.", author: "John Smith", role: "HR Director at InnovateCo", avatar: "/avatar2.png" },
        { quote: "Evalia's platform is intuitive, powerful, and has greatly improved our hiring efficiency.", author: "Alice Johnson", role: "Recruiter at StartupX", avatar: "/avatar3.png" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="testimonials" className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-teal-800">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">What Our Clients Say</h2>
                <div className="relative h-80">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="absolute w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: index === currentIndex ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
                                <p className="text-lg mb-4 text-gray-200">"{testimonial.quote}"</p>
                                <div className="flex items-center">
                                    <Image src={testimonial.avatar} alt={testimonial.author} width={50} height={50} className="rounded-full mr-4" />
                                    <div>
                                        <p className="font-semibold text-white">{testimonial.author}</p>
                                        <p className="text-teal-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function IntegrationSection() {
    const integrations = [
        { name: 'LinkedIn', logo: '/linkedin-logo.svg' },
        { name: 'Indeed', logo: '/indeed-logo.svg' },
        { name: 'Glassdoor', logo: '/glassdoor-logo.svg' },
        { name: 'Workday', logo: '/workday-logo.svg' },
    ];

    return (
        <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-teal-800 to-blue-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Integrations</h2>
                <div className="flex flex-wrap justify-center items-center gap-8">
                    {integrations.map((integration, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Image src={integration.logo} alt={integration.name} width={100} height={50} objectFit="contain" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQSection() {
    const faqs = [
        {
            question: "How does Evalia's AI evaluate resumes?",
            answer: "Evalia's AI uses advanced natural language processing and machine learning algorithms to analyze resumes. It considers factors such as skills, experience, education, and job requirements to provide comprehensive insights and rankings."
        },
        {
            question: "Is my data secure with Evalia?",
            answer: "Yes, we take data security very seriously. All data is encrypted in transit and at rest. We comply with GDPR, CCPA, and other relevant data protection regulations to ensure your information is always protected."
        },
        {
            question: "Can Evalia integrate with our existing ATS?",
            answer: "Absolutely! Evalia is designed to integrate seamlessly with most popular Applicant Tracking Systems. Our team can work with you to ensure a smooth integration with your existing workflows."
        },
        {
            question: "How accurate is the AI in candidate selection?",
            answer: "Our AI has shown to be highly accurate, with a 95% correlation to expert recruiter decisions. However, we always recommend using AI insights as a tool to augment human decision-making, not replace it entirely."
        }
    ];

    return (
        <section id="faq" className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-teal-800">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Frequently Asked Questions</h2>
                <div className="space-y-8">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3 className="text-xl font-semibold mb-2 text-white">{faq.question}</h3>
                            <p className="text-gray-300">{faq.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-8 px-4 md:px-6 lg:px-8 bg-blue-900 bg-opacity-50">
            <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <a href="/" className="text-2xl font-bold text-white">Evalia</a>
                </div>
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <ul className="flex justify-center space-x-6">
                        <li><a href="#" className="text-gray-300 hover:text-teal-400 transition-all duration-300">About Us</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-teal-400 transition-all duration-300">Contact</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-teal-400 transition-all duration-300">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 text-center md:text-right">
                    <p className="text-gray-300">&copy; 2023 Evalia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}