'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const ParticleBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-teal-500 rounded-full opacity-20"
                    style={{
                        width: Math.random() * 5 + 1,
                        height: Math.random() * 5 + 1,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}

export default function SignupComponent() {
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setIsLoading(false)
            return
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: name,
                    }
                }
            })
            if (error) throw error
            // Successful signup
            router.push('/dashboard')
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOAuthSignup = async (provider) => {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: provider,
            })
            if (error) throw error
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-teal-800 to-gray-200 p-4">
            <ParticleBackground />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-8 w-full max-w-md relative overflow-hidden shadow-xl"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold text-center mb-2 text-white">
                        Join Evalia
                    </h2>
                    <p className="text-xl text-center mb-8 text-gray-200">
                        Start Your AI-Powered Hiring Journey
                    </p>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                                    Full Name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white bg-opacity-20 text-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white bg-opacity-20 text-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white bg-opacity-20 text-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-gray-400"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                                    Confirm Password
                                </label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-white bg-opacity-20 text-white border-gray-300 focus:border-teal-500 focus:ring-teal-500 placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <Checkbox id="terms" className="text-teal-500 focus:ring-teal-500" required />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-200">
                                    I agree to the <a href="#" className="text-teal-400 hover:text-teal-300">Terms of Service</a> and <a href="#" className="text-teal-400 hover:text-teal-300">Privacy Policy</a>
                                </label>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-lg py-3 px-4 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-8">
                        <p className="text-center text-gray-300">Or sign up with</p>
                        <div className="mt-6 flex justify-center space-x-4">
                            <button onClick={() => handleOAuthSignup('google')} className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-110">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </button>

                            <button onClick={() => handleOAuthSignup('facebook')} className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-110">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>

                            <button onClick={() => handleOAuthSignup('github')} className="flex items-center justify-center w-12 h-12 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-110 bg-white">
                                <Image src="/images/github-mark.png" alt="GitHub Logo" width={24} height={24} className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-gray-300">
                        Already have an account?{' '}
                        <a href="/login" className="text-teal-400 hover:text-teal-300">
                            Sign in here
                        </a>
                    </p>
                    <p className="mt-4 text-center text-xs text-gray-400">
                        By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}