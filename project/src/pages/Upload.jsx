import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Upload = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescFile, setJobDescFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescFile) {
      alert('Please upload both your resume and job description');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate('/results');
    }, 3000);
  };

  const canAnalyze = resumeFile && jobDescFile;

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md w-full mx-4 text-center">
          <LoadingSpinner size="lg" text="Analyzing your documents..." />
          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-600">This may take a few moments</p>
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-primary-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
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
            Upload your resume and the job description you're applying for to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <FileUpload
              title="Upload Resume"
              accept=".pdf,.doc,.docx"
              onFileSelect={setResumeFile}
              placeholder="Upload your resume in PDF or DOCX format"
            />
          </div>

          <div className="card">
            <FileUpload
              title="Upload Job Description"
              accept=".pdf,.doc,.docx,.txt"
              onFileSelect={setJobDescFile}
              placeholder="Paste the job description here or upload a file..."
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
            <span>Analyze Documents</span>
            <ArrowRightIcon className="h-5 w-5" />
          </button>
          
          {!canAnalyze && (
            <p className="text-sm text-gray-500 mt-2">
              Please upload both documents to continue
            </p>
          )}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            💡 Tips for Better Results
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Ensure your resume is up-to-date and properly formatted</li>
            <li>• Include the complete job description for accurate analysis</li>
            <li>• PDF format works best for maintaining document structure</li>
            <li>• Remove any sensitive information before uploading</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;