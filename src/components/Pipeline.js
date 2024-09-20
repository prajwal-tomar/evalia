import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// import ProgressBar from './ProgressBar'

const steps = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
        ),
        title: "Resume Submission",
        description: "AI-powered intake and initial sorting",
        details: "Our advanced AI system automatically processes and categorizes incoming resumes, ensuring no qualified candidate is overlooked."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
        ),
        title: "AI-Powered Screening",
        description: "Deep analysis of candidate qualifications",
        details: "Our AI meticulously analyzes each resume, considering not just keywords but context and potential, to identify the most promising candidates."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
        ),
        title: "Candidate Ranking",
        description: "Intelligent sorting of top talent",
        details: "Using advanced algorithms, we rank candidates based on their match to job requirements, providing you with a clear view of your top prospects."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
        ),
        title: "Smart Scheduling",
        description: "Automated interview coordination",
        details: "Our AI handles the complex task of scheduling, finding the perfect time slots that work for both candidates and interviewers."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
        ),
        title: "Interview Analysis",
        description: "AI-driven interview insights",
        details: "Our advanced AI analyzes video interviews, providing objective insights on candidate performance and fit."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
        ),
        title: "Pipeline Analytics",
        description: "Real-time hiring insights",
        details: "Get a bird's-eye view of your entire hiring process with our AI-powered analytics, helping you make data-driven decisions."
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
        ),
        title: "Feedback for Rejected Candidates",
        description: "Maintain a positive candidate experience by sending out personalized feedback to those who didn't make the cut.",
        details: "Get a bird's-eye view of your entire hiring process with our AI-powered analytics, helping you make data-driven decisions."
    },
]

const ProgressBar = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0
                }
                const diff = 1
                return Math.min(oldProgress + diff, 100)
            })
        }, 100)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-800 rounded-full overflow-hidden transform translate-y-16">
            <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500"
                style={{
                    width: `${progress}%`,
                }}
            />
        </div>
    )
}

export default function FuturisticPipeline() {
    const [hoveredStep, setHoveredStep] = useState(null)

    return (
        <div className="bg-gray-900 p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    className="text-4xl font-bold text-center mb-12 text-blue-400 tracking-wider"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    AI-Powered Recruitment Pipeline
                </motion.h1>
                <div className="relative mb-24">
                    <div className="flex justify-between relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <motion.div
                                    className={`flex flex-col items-center w-40 ${index >= 3 ? 'opacity-50' : ''
                                        }`}
                                    whileHover={{ scale: index < 3 ? 1.05 : 1 }}
                                    onHoverStart={() => setHoveredStep(index)}
                                    onHoverEnd={() => setHoveredStep(null)}
                                >
                                    <motion.div
                                        className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 cursor-pointer
                                  ${index < 3 ? 'bg-gradient-to-br from-blue-500 to-teal-400' : 'bg-gray-700'}
                                  shadow-lg`}
                                        whileHover={{ boxShadow: "0 0 25px 5px rgba(56, 189, 248, 0.5)" }}
                                        animate={{
                                            scale: hoveredStep === index ? 1.1 : 1,
                                            rotate: hoveredStep === index ? [0, 5, -5, 0] : 0,
                                        }}
                                        transition={{
                                            scale: { duration: 0.2 },
                                            rotate: { duration: 0.5, repeat: Infinity },
                                        }}
                                    >
                                        <div className="text-white">{step.icon}</div>
                                    </motion.div>
                                    <motion.h3
                                        className="text-lg font-semibold text-center text-white mb-2"
                                        animate={{
                                            color: hoveredStep === index ? "#38BDF8" : "#FFFFFF",
                                        }}
                                    >
                                        {step.title}
                                    </motion.h3>
                                    <motion.p
                                        className="text-sm text-center text-gray-400"
                                        animate={{
                                            opacity: hoveredStep === index ? 1 : 0.7,
                                        }}
                                    >
                                        {index < 3 ? step.description : "Coming Soon"}
                                    </motion.p>
                                </motion.div>
                                <AnimatePresence>
                                    {hoveredStep === index && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute z-20 bg-gray-800 text-white p-4 rounded-lg shadow-lg mt-2 w-64"
                                            style={{
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                top: '100%',
                                            }}
                                        >
                                            <p className="text-sm">{step.details}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                    {/* <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 transform -translate-y-1/2">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </div> */}
                    <ProgressBar />
                </div>
            </div>
        </div>
    )
}