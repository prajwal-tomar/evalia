'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import { Upload, FileText, UserCheck, Calendar, Video, BarChart2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
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
        <header className="py-3 px-4 md:px-6 lg:px-8 bg-black bg-opacity-20 backdrop-blur-md transition-colors duration-300 sticky top-0 z-50">
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <a href="/" className="text-2xl font-bold text-white glow-text">Hirescan</a>
                <ul className="flex space-x-6">
                    <li><a href="#features" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:glow-text">Features</a></li>
                    <li><a href="#how-it-works" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:glow-text">How It Works</a></li>
                    <li><a href="#testimonials" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:glow-text">Testimonials</a></li>
                    <li><a href="#faq" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:glow-text">FAQ</a></li>
                </ul>
                <Link href="/login" className="px-4 py-2 bg-transparent border border-teal-400 text-teal-400 rounded-full hover:bg-teal-400 hover:text-white transition-all duration-300 hover:glow-button">
                    Login
                </Link>
            </nav>
        </header>
    );
}

function HeroSection() {
    return (
        <section className="py-24 px-4 md:px-6 lg:px-8 flex items-center bg-gradient-to-r from-blue-800 to-teal-700 relative overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                    backgroundImage: [
                        'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 50%)',
                        'radial-gradient(circle, rgba(0,0,255,0.3) 0%, rgba(0,0,0,0) 50%)',
                        'radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,0,0,0) 50%)',
                    ],
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center relative z-10">
                <div className="text-center mb-10 md:mb-0">
                    <motion.h1
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white glow-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Revolutionize Hiring with AI
                    </motion.h1>
                    <motion.p
                        className="text-xl font-semibold md:text-2xl mb-8 text-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Streamline your recruitment process from resume screening to job offers with AI-powered automation.
                    </motion.p>
                    <motion.p
                        className="text-lg max-w-4xl mx-auto mb-10 text-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Your one-stop solution for a faster, smarter, and more efficient hiring process. From identifying top talent to sending job offers, Hirescan automates every step.
                    </motion.p>
                    <div className="flex justify-center space-x-4">
                        <motion.button
                            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-lg font-semibold text-white shadow-lg hover:shadow-orange-500/50 transition-all duration-300 glow-button"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 165, 0, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Link href='/signup'>Get Started</Link>
                        </motion.button>
                        <motion.button
                            className="px-8 py-4 bg-transparent border-2 border-gray-300 rounded-full text-lg font-semibold text-white shadow-lg hover:bg-white hover:text-blue-800 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
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
        // {
        //     title: 'Feedback for Rejected Candidates',
        //     icon: <MessageSquare className="w-12 h-12" />,
        //     description: "Maintain a positive candidate experience by sending out personalized feedback to those who didn't make the cut."
        // }
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
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="text-teal-400 mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                            <p className="text-gray-300 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTASection() {
    return (
        <section className="py-16 bg-gradient-to-br from-blue-900 to-teal-800 relative overflow-hidden">
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
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white glow-text">Ready to Revolutionize Your Hiring Process?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">Join hundreds of recruiters who are already benefiting from a streamlined, data-driven approach to hiring. Experience smarter recruiting with Hirescan.</p>
                <Link href="/signup" className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-teal-500 hover:to-blue-600 transition duration-300 inline-block transform hover:scale-105 shadow-lg glow-button">
                    Get Started Now
                </Link>
                <p className="mt-6 text-sm text-gray-400">Sign up for early access and be the first to experience AI-driven hiring automation. No credit card required.</p>
            </div>
        </section>
    );
}

function FAQSection() {
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
                <div className="space-y-8">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg backdrop-blur-sm border border-teal-400 border-opacity-30"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h3 className="text-2xl font-semibold mb-4 text-white glow-text-sm">{faq.question}</h3>
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
        <footer className="py-12 px-4 md:px-6 lg:px-8 bg-blue-900">
            <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
                <div className="w-full md:w-1/3 mb-8 md:mb-0">
                    <a href="/" className="text-3xl font-bold text-white glow-text">Hirescan</a>
                    <p className="mt-2 text-gray-300">AI-powered hiring solutions</p>
                </div>
                <div className="w-full md:w-1/3 mb-8 md:mb-0">
                    <ul className="flex justify-center space-x-8">
                        <li><a href="#" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:glow-text-sm">About Us</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:glow-text-sm">Contact</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:glow-text-sm">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 text-center md:text-right">
                    <p className="text-gray-300">&copy; 2024 Hirescan. All rights reserved.</p>
                </div>
            </div>
        </footer>
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
                            <div className="text-6xl font-bold text-teal-400 mb-4 glow-text-sm">{metric.value}</div>
                            <div className="text-xl text-gray-300">{metric.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
