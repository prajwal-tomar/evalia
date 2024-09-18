'use client'

import { useState } from 'react'

export default function FeatureCard({ title, description, icon, active, comingSoon }) {
    const [isHovered, setIsHovered] = useState(false)

    const handleClick = () => {
        if (comingSoon) {
            alert('This feature is coming soon. Stay tuned!')
        }
        // Add logic for active features here
    }

    return (
        <div
            className={`relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ${isHovered ? 'shadow-xl transform -translate-y-1' : ''
                } ${active ? 'border-2 border-teal-500' : 'border border-gray-200'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <div className="px-6 py-4 bg-white">
                <div className="flex items-center mb-2">
                    <span className="text-3xl mr-2">{icon}</span>
                    <h3 className="font-bold text-xl text-gray-800">{title}</h3>
                </div>
                <p className="text-gray-600">{description}</p>
            </div>
            {comingSoon && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-bl">
                    Coming Soon
                </div>
            )}
            {active && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500"></div>
            )}
        </div>
    )
}