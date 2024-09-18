'use client'

import React, { useState } from 'react';

export default function ResumeEvaluation() {
    const [selectedJob, setSelectedJob] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [evaluationComplete, setEvaluationComplete] = useState(false);
    const [error, setError] = useState('');
    const [uploadProgress, setUploadProgress] = useState({});
    const [evaluationStep, setEvaluationStep] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const jobDescriptions = [
        { id: 'job1', title: 'Software Engineer - Full Stack' },
        { id: 'job2', title: 'Data Scientist - Machine Learning' },
        { id: 'job3', title: 'UX/UI Designer' },
        { id: 'job4', title: 'Product Manager' },
    ];

    const filteredJobs = jobDescriptions.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleJobSelection = (e) => {
        setSelectedJob(e.target.value);
        setError('');
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles(prev => [...prev, ...files]);
        setError('');

        // Simulate file upload progress
        files.forEach(file => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
                if (progress >= 100) clearInterval(interval);
            }, 200);
        });
    };

    const removeFile = (fileName) => {
        setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
        setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[fileName];
            return newProgress;
        });
    };

    const startEvaluation = () => {
        if (!selectedJob) {
            setError('Please select a job description.');
            return;
        }
        if (uploadedFiles.length === 0) {
            setError('Please upload at least one resume.');
            return;
        }
        setError('');
        setIsEvaluating(true);
        setEvaluationStep(1);
        // Simulating evaluation process
        const totalSteps = uploadedFiles.length + 1;
        let currentStep = 1;
        const interval = setInterval(() => {
            if (currentStep < totalSteps) {
                setEvaluationStep(currentStep);
                currentStep++;
            } else {
                clearInterval(interval);
                setIsEvaluating(false);
                setEvaluationComplete(true);
                setEvaluationStep(0);
            }
        }, 2000);
    };

    const downloadResults = () => {
        // Placeholder for download functionality
        console.log('Downloading results...');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-800 to-teal-700 text-white p-8 font-sans">
            {/* Header Section */}
            <header className="mb-8">
                <nav className="text-sm mb-2">
                    <span className="opacity-75">Dashboard</span>
                    <span className="mx-2">&gt;</span>
                    <span className="font-semibold">Evaluate Resumes</span>
                </nav>
                <h1 className="text-4xl font-bold">Welcome, User</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Job Description Selection */}
                <section className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Select Job Description</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search job descriptions..."
                            className="w-full bg-white bg-opacity-20 rounded-lg p-3 text-white placeholder-white placeholder-opacity-75 mb-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className="w-full bg-white bg-opacity-20 rounded-lg p-3 text-white appearance-none cursor-pointer transition-all duration-300 hover:bg-opacity-30"
                            value={selectedJob}
                            onChange={handleJobSelection}
                        >
                            <option value="">Select a Job Description</option>
                            {filteredJobs.map(job => (
                                <option key={job.id} value={job.id}>{job.title}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    <button className="mt-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Add New JD
                    </button>
                </section>

                {/* Resume Upload Section */}
                <section className="bg-white bg-opacity-10 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Upload Resumes</h2>
                    <div className="border-2 border-dashed border-white rounded-lg p-8 text-center transition-all duration-300 ease-in-out hover:bg-white hover:bg-opacity-10">
                        <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            id="resume-upload"
                        />
                        <label
                            htmlFor="resume-upload"
                            className="cursor-pointer flex flex-col items-center justify-center h-40"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 transform transition-transform duration-300 ease-in-out group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span>Drag and drop resumes here or click to upload</span>
                        </label>
                    </div>
                    {uploadedFiles.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Uploaded Files:</h3>
                            <ul>
                                {uploadedFiles.map((file, index) => (
                                    <li key={index} className="text-sm opacity-75 flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-2 text-green-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            {file.name}
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-24 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress[file.name] || 0}%` }}></div>
                                            </div>
                                            <button onClick={() => removeFile(file.name)} className="text-red-500 hover:text-red-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-3 bg-red-500 bg-opacity-75 rounded-lg text-white">
                    <p>{error}</p>
                </div>
            )}

            {/* Action Button */}
            <section className="mt-8 text-center">
                <button
                    onClick={startEvaluation}
                    disabled={isEvaluating}
                    className="bg-gradient-to-r from-blue-600 to-teal-400 text-white font-bold py-3 px-8 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105 hover:from-blue-700 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Start Evaluation
                </button>
            </section>

            {/* Evaluation Progress */}
            {isEvaluating && (
                <section className="mt-8 bg-white bg-opacity-10 rounded-lg p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Evaluation in Progress</h2>
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                                    Progress
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-teal-600">
                                    {Math.round((evaluationStep / uploadedFiles.length) * 100)}%
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                            <div style={{ width: `${(evaluationStep / uploadedFiles.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500 ease-in-out"></div>
                        </div>
                    </div>
                    <p className="text-center animate-pulse">
                        Evaluating Resume {evaluationStep} of {uploadedFiles.length}...
                    </p>
                </section>
            )}

            {/* Download Results */}
            {evaluationComplete && (
                <section className="mt-8 bg-white bg-opacity-10 rounded-lg p-6 shadow-lg text-center">
                    <div className="flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-green-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        <h2 className="text-2xl font-semibold">Evaluation Complete!</h2>
                    </div>
                    <button
                        onClick={downloadResults}
                        className="bg-gradient-to-r from-green-500 to-teal-400 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:from-green-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Download Results
                    </button>
                </section>
            )}

            {/* Tooltip */}
            <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded-lg text-sm">
                Tip: Select a job description and upload resumes to start the evaluation process.
            </div>
        </div>
    );
}
