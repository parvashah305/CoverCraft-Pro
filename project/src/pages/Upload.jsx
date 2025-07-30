import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { apiService } from '../services/api';

const Upload = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescFile, setJobDescFile] = useState(null);
  const [jobDescText, setJobDescText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!resumeFile || (!jobDescFile && !jobDescText.trim())) {
      setError('Please upload your resume and provide a job description (either file or text)');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    
    try {
      // Step 1: Upload files and extract text
      const uploadResponse = await apiService.uploadFiles(
        resumeFile,
        jobDescFile,
        jobDescText.trim() || null
      );

      if (uploadResponse.error) {
        throw new Error(uploadResponse.error);
      }

      const { resume_text, jd_text } = uploadResponse;

      // Step 2: Generate summaries
      const summariesResponse = await apiService.generateSummaries(resume_text, jd_text);
      
      // Step 3: Extract and match skills
      const skillsResponse = await apiService.matchSkills(resume_text, jd_text);

      // Step 4: Generate cover letter
      const coverLetterResponse = await apiService.generateCoverLetter(
        summariesResponse.resume_summary,
        summariesResponse.jd_summary
      );

      // Step 5: Generate cold email
      const coldEmailResponse = await apiService.generateColdEmail(
        summariesResponse.resume_summary,
        summariesResponse.jd_summary
      );

      // Navigate to results with all the data
      navigate('/results', {
        state: {
          resumeText: resume_text,
          jdText: jd_text,
          resumeSummary: summariesResponse.resume_summary,
          jdSummary: summariesResponse.jd_summary,
          skillsMatch: skillsResponse,
          coverLetter: coverLetterResponse.cover_letter,
          coldEmail: coldEmailResponse.cold_email,
        }
      });

    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'An error occurred during analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canAnalyze = resumeFile && (jobDescFile || jobDescText.trim());

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md w-full mx-4 text-center">
          <LoadingSpinner size="lg" text="Analyzing your documents..." />
          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-600">Processing ...</p>
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-primary-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Upload Your Documents
          </h1>
          <p className="text-lg text-gray-600">
            Upload your resume and the job description you're applying for to get AI-powered insights.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <FileUpload
              title="Upload Resume"
              accept=".pdf,.doc,.docx"
              onFileSelect={setResumeFile}
              placeholder="Upload your resume in PDF or DOCX format"
              allowText={false}
            />
          </div>

          <div className="card">
            <FileUpload
              title="Job Description"
              accept=".pdf,.doc,.docx,.txt"
              onFileSelect={setJobDescFile}
              onTextChange={setJobDescText}
              placeholder="Paste the job description here..."
              allowText={true}
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              canAnalyze
                ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Analyze</span>
            <ArrowRightIcon className="h-5 w-5" />
          </button>
          
          {!canAnalyze && (
            <p className="text-sm text-gray-500 mt-2">
              Please upload your resume and provide a job description to continue
            </p>
          )}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🚀 What You'll Get
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• AI-powered skill matching and gap analysis</li>
            <li>• Professional resume and job description summaries</li>
            <li>• Personalized cover letter generation</li>
            <li>• Detailed compatibility scoring</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;