'use client'

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResumeEvaluation() {
    const [selectedJob, setSelectedJob] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [evaluationComplete, setEvaluationComplete] = useState(false);
    const [error, setError] = useState('');
    const [uploadProgress, setUploadProgress] = useState({});
    const [evaluationStep, setEvaluationStep] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [jobDescriptions, setJobDescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        fetchJobDescriptions();
    }, []);

    const fetchJobDescriptions = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/get_jds');
            if (!response.ok) {
                throw new Error('Failed to fetch job descriptions');
            }
            const data = await response.json();
            setJobDescriptions(data.filter(job => job.id !== '.emptyFolderPlaceholder'));
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching job descriptions:', error);
            toast.error('Failed to load job descriptions. Please try again later.');
            setIsLoading(false);
        }
    };

    const filteredJobs = jobDescriptions.filter(job =>
        job.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleJobSelection = (e) => {
        setSelectedJob(e.target.value);
        setError('');
    };

    const validateFile = (file) => {
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            toast.error(`File ${file.name} is not a valid file type. Please upload only PDF or DOCX files.`);
            return false;
        }
        return true;
    };

    const handleFileUpload = async (files) => {
        for (const file of files) {
            if (!validateFile(file)) continue;

            try {
                setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

                const { data, error } = await supabase.storage
                    .from('resumes')
                    .upload(`${Date.now()}_${file.name}`, file, {
                        onUploadProgress: (progress) => {
                            const percent = (progress.loaded / progress.total) * 100;
                            setUploadProgress(prev => ({ ...prev, [file.name]: percent }));
                        }
                    });

                if (error) throw error;

                setUploadedFiles(prev => [...prev, { name: file.name, path: data.path }]);
                setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
                toast.success(`File ${file.name} uploaded successfully!`);
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error(`Failed to upload ${file.name}. Please try again.`);
                setUploadProgress(prev => {
                    const newProgress = { ...prev };
                    delete newProgress[file.name];
                    return newProgress;
                });
            }
        }
    };

    const removeFile = async (fileName) => {
        const fileToRemove = uploadedFiles.find(file => file.name === fileName);
        if (fileToRemove) {
            try {
                const { error } = await supabase.storage
                    .from('resumes')
                    .remove([fileToRemove.path]);

                if (error) throw error;

                setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
                setUploadProgress(prev => {
                    const newProgress = { ...prev };
                    delete newProgress[fileName];
                    return newProgress;
                });
                toast.success(`File ${fileName} removed successfully!`);
            } catch (error) {
                console.error('Error removing file:', error);
                toast.error(`Failed to remove ${fileName}. Please try again.`);
            }
        }
    };

    const startEvaluation = async () => {
        if (!selectedJob) {
            toast.error('Please select a job description.');
            return;
        }
        if (uploadedFiles.length === 0) {
            toast.error('Please upload at least one resume.');
            return;
        }
        setIsEvaluating(true);
        setEvaluationStep(1);

        try {
            const response = await fetch('http://127.0.0.1:5000/evaluate_resumes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobDescriptionName: selectedJob,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to evaluate resumes');
            }

            const data = await response.json();
            const fileName = data.result;

            // Download the file from Supabase storage
            const { data: fileData, error } = await supabase.storage
                .from('results')
                .download(fileName);

            if (error) {
                throw error;
            }

            // Create a download link for the file
            const url = URL.createObjectURL(fileData);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(a);

            setIsEvaluating(false);
            setEvaluationComplete(true);
            toast.success('Evaluation complete! Downloading results...');
        } catch (error) {
            console.error('Error evaluating resumes:', error);
            toast.error('Failed to evaluate resumes. Please try again.');
            setIsEvaluating(false);
        }
    };


    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFileUpload(files);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <header className="mb-8">
                <nav className="text-sm mb-2">
                    <span className="opacity-75">Dashboard</span>
                    <span className="mx-2">&gt;</span>
                    <span className="font-semibold">Evaluate Resumes</span>
                </nav>
                <h1 className="text-4xl font-bold">Welcome, Prajwal Tomar</h1>
            </header>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="grid grid-cols-1 gap-6">
                    {/* Job Description Selection */}
                    <section className="bg-gray-50 rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Select Job Description</h2>
                        <div className="space-y-4">
                            {/* <input
                                type="text"
                                placeholder="Search job descriptions..."
                                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            /> */}
                            {isLoading ? (
                                <p>Loading job descriptions...</p>
                            ) : (
                                <select
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                                    value={selectedJob}
                                    onChange={handleJobSelection}
                                >
                                    <option value="">Select a Job Description</option>
                                    {filteredJobs.map(job => (
                                        <option key={job.id} value={job.id}>{job.id}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Add New JD
                        </button>
                    </section>

                    {/* Resume Upload Section */}
                    <section className="bg-gray-50 rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Upload Resumes</h2>
                        <div
                            className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} rounded-lg p-8 text-center hover:border-blue-500 transition-all duration-300 ease-in-out`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                multiple
                                onChange={(e) => handleFileUpload(Array.from(e.target.files))}
                                className="hidden"
                                id="resume-upload"
                                accept=".pdf,.docx"
                            />
                            <label
                                htmlFor="resume-upload"
                                className="cursor-pointer flex flex-col items-center justify-center h-32"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="text-gray-500">Drag and drop resumes here or click to upload</span>
                                <span className="text-sm text-gray-400 mt-2">Only PDF and DOCX files are allowed</span>
                            </label>
                        </div>
                        {uploadedFiles.length > 0 && (
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Uploaded Files:</h3>
                                <ul className="space-y-2">
                                    {uploadedFiles.map((file, index) => (
                                        <li key={index} className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M5 13l4 4L19 7"></path>
                                                </svg>
                                                <span className="text-sm text-gray-700">{file.name}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
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

                {/* Action Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={startEvaluation}
                        disabled={isEvaluating}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {isEvaluating ? 'Evaluating...' : 'Start Evaluation'}
                    </button>
                </div>
            </div>

            {/* Evaluation Progress */}
            {isEvaluating && (
                <section className="bg-white rounded-lg p-6 shadow-lg mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Evaluation in Progress</h2>
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                    Progress
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-blue-600">
                                    {Math.round((evaluationStep / uploadedFiles.length) * 100)}%
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                            <div style={{ width: `${(evaluationStep / uploadedFiles.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"></div>
                        </div>
                    </div>
                    <p className="text-center text-gray-600 animate-pulse">
                        Evaluating Resume {evaluationStep} of {uploadedFiles.length}...
                    </p>
                </section>
            )}

            {/* Evaluation Complete */}
            {evaluationComplete && (
                <section className="bg-white rounded-lg p-6 shadow-lg mb-8 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        <h2 className="text-2xl font-semibold">Evaluation Complete!</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        The evaluation results have been downloaded automatically. You can find the Excel file in your downloads folder.
                    </p>
                </section>
            )}
        </div>
    );
}