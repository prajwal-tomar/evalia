'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import { Upload, Search, UserCheck, Users, Brain, MessageCircle } from 'lucide-react';
import Link from 'next/link';

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
                    <KeyFeaturesSection />
                    <HowItWorksSection />
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
                <a href="/" className="text-2xl font-bold text-white glow-text">Evalia</a>
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
                        Unlock the Power of AI in Hiring
                    </motion.h1>
                    <motion.p
                        className="text-xl font-semibold md:text-2xl mb-8 text-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        AI-driven resume evaluation and ranking for faster, smarter hiring decisions
                    </motion.p>
                    <motion.p
                        className="text-lg max-w-4xl mx-auto mb-10 text-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Transform your recruitment process with Evalia&apos;s cutting-edge AI technology. Streamline candidate evaluation and make data-driven hiring decisions.
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-teal-400 border-opacity-30"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="text-teal-400 mb-6">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
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
        <section id="how-it-works" className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-teal-800 relative overflow-hidden">
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
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white glow-text">How It Works</h2>
                <div className="space-y-24">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex items-center space-x-12"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.3 }}
                        >
                            <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg glow-icon">
                                {step.icon}
                            </div>
                            <div>
                                <h3 className="text-3xl font-semibold mb-4 text-white glow-text-sm">{step.title}</h3>
                                <p className="text-xl text-gray-300">{step.description}</p>
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
            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white glow-text">Our Impact</h2>
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
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white glow-text">Ready to Transform Your Hiring Process?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">Join thousands of companies leveraging AI to streamline their recruitment, improve hiring accuracy, and build stronger teams.</p>
                <Link href="/signup" className="bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-teal-500 hover:to-blue-600 transition duration-300 inline-block transform hover:scale-105 shadow-lg glow-button">
                    Get Started Now
                </Link>
                <p className="mt-6 text-sm text-gray-400">Experience the power of AI-driven hiring risk-free with our 30-day money-back guarantee!</p>
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
        <section id="faq" className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-teal-800 relative overflow-hidden">
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
                    <a href="/" className="text-3xl font-bold text-white glow-text">Evalia</a>
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
                    <p className="text-gray-300">&copy; 2024 Evalia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}