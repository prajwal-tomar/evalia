'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Upload, FileText, UserCheck, Calendar, Video, BarChart2, MessageSquare, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import FuturisticPipeline from './Pipeline';

export default function LandingPage() {
    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-800 to-gray-200 text-white overflow-hidden">
            <motion.div
                className="fixed inset-0 bg-[url('/subtle-pattern.png')] opacity-5"
                style={{ y: backgroundY }}
            />
            <motion.div
                className="fixed inset-0 opacity-30"
                animate={{
                    background: [
                        'radial-gradient(circle, rgba(0,0,255,0.1) 0%, rgba(0,0,0,0) 50%)',
                        'radial-gradient(circle, rgba(0,255,255,0.1) 0%, rgba(0,0,0,0) 50%)',
                        'radial-gradient(circle, rgba(0,0,255,0.1) 0%, rgba(0,0,0,0) 50%)',
                    ],
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className="relative z-10">
                <Header />
                <main>
                    <HeroSection />
                    <FuturisticPipeline />
                    <KeyFeaturesSection />
                    <MetricsSection />
                    <CTASection />
                    <FAQSection />
                </main>
                <Footer />
            </div>
        </div>
    );
}

function Header() {
    return (
        <header className="py-2 px-4 md:px-6 lg:px-8 bg-black bg-opacity-10 backdrop-blur-md transition-all duration-300 sticky top-0 z-50">
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <a href="/" className="text-2xl font-bold text-white glow-text">Hirescan</a>
                <ul className="flex space-x-6">
                    <li><a href="#features" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:glow-text">Features</a></li>
                    <li><a href="#how-it-works" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:glow-text">How It Works</a></li>
                    <li><a href="#faq" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:glow-text">FAQ</a></li>
                </ul>
                <Link href="/login" className="px-4 py-2 bg-transparent border border-teal-400 text-teal-400 rounded-full hover:bg-teal-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-teal-400/50">
                    Login
                </Link>
            </nav>
        </header>
    );
}

function HeroSection() {
    const words = ["Artifical Intelligence"]; // add more words if need dynamic words
    const [currentWord, setCurrentWord] = useState(0);

    return (
        <section className="py-24 px-4 md:px-6 lg:px-8 flex items-center bg-gradient-to-r from-blue-800 to-teal-700 relative overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                    backgroundImage: [
                        'radial-gradient(circle at 20% 50%, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(0,0,255,0.3) 0%, rgba(0,0,0,0) 50%)',
                        'radial-gradient(circle at 50% 20%, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 50%)',
                    ],
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center relative z-10">
                <div className="text-center mb-10 md:mb-0">
                    <motion.h1
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white glow-text leading-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Revolutionize Hiring with <br />
                        <motion.span
                            key={words[currentWord]}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 1 }}
                            onAnimationComplete={() => {
                                setCurrentWord((currentWord + 1) % words.length);
                            }}
                            className="text-teal-400"
                        >
                            {words[currentWord]}
                        </motion.span>
                    </motion.h1>
                    <motion.p
                        className="text-xl font-semibold md:text-2xl mb-8 text-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Streamline your recruitment process from resume screening to job offers with AI-powered automation.
                    </motion.p>
                    <div className="flex justify-center space-x-4">
                        <motion.button
                            className="px-8 py-4 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full text-lg font-semibold text-white shadow-lg hover:shadow-teal-400/50 transition-all duration-300"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href='/signup'>Get Started</Link>
                        </motion.button>
                        <motion.button
                            className="px-8 py-4 bg-transparent border-2 border-white rounded-full text-lg font-semibold text-white shadow-lg hover:bg-white hover:text-blue-800 transition-all duration-300"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href='/login'>Login</Link>
                        </motion.button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function KeyFeaturesSection() {
    const features = [
        {
            title: 'Resume Submission',
            icon: <Upload className="w-12 h-12" />,
            description: 'The recruiter uploads resumes in bulk along with the job description. Currently tested with 50+ resumes.'
        },
        {
            title: 'AI-Powered Resume Screening',
            icon: <FileText className="w-12 h-12" />,
            description: 'The system analyzes each resume, sorting candidates based on skills, experience, and relevancy.'
        },
        {
            title: 'Automated Candidate Ranking',
            icon: <UserCheck className="w-12 h-12" />,
            description: 'Candidates are ranked based on a combination of AI metrics, letting you see top talent at a glance.'
        },
        {
            title: 'Smart Interview Scheduling',
            icon: <Calendar className="w-12 h-12" />,
            description: "Automatically schedule interviews with candidates using Hirescan's intelligent scheduling tool."
        },
        {
            title: 'Video Interview Analysis',
            icon: <Video className="w-12 h-12" />,
            description: "Conduct AI-enhanced video interviews and receive comprehensive reports on each candidate's performance."
        },
        {
            title: 'Hiring Pipeline Analytics',
            icon: <BarChart2 className="w-12 h-12" />,
            description: 'View real-time insights on your recruitment process and optimize future hires with detailed analytics.'
        },
    ];

    return (
        <section id="features" className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-teal-800 relative overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                    backgroundImage: [
                        'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                        'radial-gradient(circle, rgba(0,0,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                        'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                    ],
                }}
                transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white glow-text">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-teal-400 border-opacity-30"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                                rotateY: 10
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <motion.div
                                className="text-teal-400 mb-4"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                            <p className="text-gray-300 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function MetricsSection() {
    const metrics = [
        { value: '50%', label: 'Time Saved' },
        { value: '100%', label: 'Process Automation' },
        { value: '95%', label: 'Improved Hiring Quality' },
        { value: '80%', label: 'Reduced Hiring Costs' },
    ];

    return (
        <section className="py-24 px-4 md:px-6 lg:px-8 bg-gray-900 relative overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                    backgroundImage: [
                        'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                        'radial-gradient(circle, rgba(0,0,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                        'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                    ],
                }}
                transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white glow-text">The Hirescan Advantage</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <motion.div
                                className="text-6xl font-bold text-teal-400 mb-4 glow-text-sm"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                            >
                                {metric.value}
                            </motion.div>
                            <div className="text-xl text-gray-300">{metric.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTASection() {
    return (
        <section className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-teal-800 relative overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                    backgroundImage: [
                        'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                        'radial-gradient(circle, rgba(0,0,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                        'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                    ],
                }}
                transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.h2
                    className="text-4xl sm:text-5xl font-bold mb-8 text-white glow-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Ready to Revolutionize Your Hiring Process?
                </motion.h2>
                <motion.p
                    className="text-xl mb-12 max-w-3xl mx-auto text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Join hundreds of recruiters who are already benefiting from a streamlined, data-driven approach to hiring. Experience smarter recruiting with Hirescan.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Link href="/signup" className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold py-4 px-10 rounded-full text-lg hover:from-teal-500 hover:to-blue-600 transition duration-300 inline-block transform hover:scale-105 shadow-lg hover:shadow-teal-400/50">
                        Get Started Now
                    </Link>
                </motion.div>
                <motion.p
                    className="mt-8 text-sm text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Sign up for early access and be the first to experience AI-driven hiring automation. No credit card required.
                </motion.p>
            </div>
        </section>
    );
}

function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How does Hirescan rank candidates?",
            answer: "Hirescan uses an advanced AI algorithm that considers skills, experience, and relevance to the job description to rank candidates effectively."
        },
        {
            question: "Can Hirescan integrate with my existing tools?",
            answer: "Yes, Hirescan integrates seamlessly with most ATS and HR platforms."
        },
        {
            question: "Is the interview scheduling tool customizable?",
            answer: "Absolutely. You can set preferences for availability, interview duration, and more."
        },
        {
            question: "How does Hirescan ensure data security?",
            answer: "We take data security very seriously. All data is encrypted in transit and at rest. We comply with GDPR, CCPA, and other relevant data protection regulations to ensure your information is always protected."
        }
    ];

    return (
        <section id="faq" className="py-24 px-4 md:px-6 lg:px-8 bg-gray-900 relative overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                    backgroundImage: [
                        'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                        'radial-gradient(circle, rgba(0,0,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                        'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 70%)',
                    ],
                }}
                transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className="max-w-5xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white glow-text">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-sm border border-teal-400 border-opacity-30 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <button
                                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                                <ChevronDown
                                    className={`w-6 h-6 text-teal-400 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-6 pb-6"
                                    >
                                        <p className="text-gray-300">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-8 px-4 md:px-6 lg:px-8 bg-blue-900 bg-opacity-50 backdrop-blur-md">
            <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
                <div className="w-full md:w-auto mb-4 md:mb-0">
                    <a href="/" className="text-2xl font-bold text-white glow-text">Hirescan</a>
                    <p className="mt-1 text-sm text-gray-300">AI-powered hiring solutions</p>
                </div>
                <div className="w-full md:w-auto mb-4 md:mb-0">
                    <ul className="flex justify-center space-x-6">
                        <li><a href="#" className="text-sm text-gray-300 hover:text-teal-400 transition-all duration-300">About Us</a></li>
                        <li><a href="#" className="text-sm text-gray-300 hover:text-teal-400 transition-all duration-300">Contact</a></li>
                        <li><a href="#" className="text-sm text-gray-300 hover:text-teal-400 transition-all duration-300">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-auto text-center md:text-right">
                    <p className="text-sm text-gray-300">&copy; 2024 Hirescan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
