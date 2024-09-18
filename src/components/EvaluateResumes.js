'use client'

import { useState } from 'react'

export default function EvaluateResumes() {
    const [uploadedResumes, setUploadedResumes] = useState([])
    const [evaluatedCandidates, setEvaluatedCandidates] = useState([])

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files)
        setUploadedResumes(files)
        // Simulating evaluation process
        setTimeout(() => {
            const evaluated = files.map(file => ({
                name: file.name.replace('.pdf', ''),
                match: Math.floor(Math.random() * 100),
                experience: Math.floor(Math.random() * 10) + 1,
                skills: ['JavaScript', 'React', 'Node.js'].sort(() => 0.5 - Math.random()).slice(0, 2)
            }))
            setEvaluatedCandidates(evaluated)
        }, 2000)
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Evaluate Resumes</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resume-upload">
                    Upload Resumes
                </label>
                <input
                    type="file"
                    id="resume-upload"
                    multiple
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            {uploadedResumes.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Uploaded Resumes</h3>
                    <ul className="list-disc list-inside">
                        {uploadedResumes.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {evaluatedCandidates.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Evaluated Candidates</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Match</th>
                                    <th className="py-3 px-6 text-left">Experience</th>
                                    <th className="py-3 px-6 text-left">Skills</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {evaluatedCandidates.map((candidate, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{candidate.name}</td>
                                        <td className="py-3 px-6 text-left">{candidate.match}%</td>
                                        <td className="py-3 px-6 text-left">{candidate.experience} years</td>
                                        <td className="py-3 px-6 text-left">{candidate.skills.join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}