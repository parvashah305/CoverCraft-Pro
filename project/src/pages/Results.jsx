import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProgressCircle from '../components/ProgressCircle';
import { 
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  EyeIcon 
} from '@heroicons/react/24/outline';

const Results = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCoverLetter, setCopiedCoverLetter] = useState(false);
  const [copiedColdEmail, setCopiedColdEmail] = useState(false);
  const [isEditingCoverLetter, setIsEditingCoverLetter] = useState(false);
  const [isEditingColdEmail, setIsEditingColdEmail] = useState(false);
  const location = useLocation();
  
  // Get data from navigation state (passed from Upload component)
  const {
    resumeText = '',
    jdText = '',
    resumeSummary = '',
    jdSummary = '',
    skillsMatch = {},
    coverLetter: initialCoverLetter = '',
    coldEmail: initialColdEmail = ''
  } = location.state || {};

  // Editable state for cover letter and cold email
  const [editableCoverLetter, setEditableCoverLetter] = useState(initialCoverLetter);
  const [editableColdEmail, setEditableColdEmail] = useState(initialColdEmail);

  // If no data is available, redirect to upload
  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md w-full mx-4 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">No Analysis Data</h2>
          <p className="text-gray-600 mb-6">Please upload your documents first to see results.</p>
          <Link to="/upload" className="btn-primary">
            Go to Upload
          </Link>
        </div>
      </div>
    );
  }

  const matchScore = skillsMatch.match_score || 0;
  const matchedSkills = skillsMatch.matched_keywords || [];
  const missingSkills = skillsMatch.missing_keywords || [];
  const additionalSkills = skillsMatch.additional_skills || [];

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'cover-letter') {
        setCopiedCoverLetter(true);
        setTimeout(() => setCopiedCoverLetter(false), 2000);
      } else if (type === 'cold-email') {
        setCopiedColdEmail(true);
        setTimeout(() => setCopiedColdEmail(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadDocument = (content, filename) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'skills', name: 'Skills Analysis' },
    { id: 'cover-letter', name: 'Cover Letter' },
    { id: 'cold-email', name: 'Cold Email' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/upload" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Upload
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Analysis Results</h1>
          <p className="text-gray-600 mt-2">AI-powered analysis of your resume and job description</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Match Score */}
            <div className="card text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Overall Match Score</h2>
              <ProgressCircle percentage={matchScore} size="lg" showLabel={true} animated={true} />
              <p className="mt-4 text-gray-600">
                {skillsMatch.explanation || 'Your resume matches the job requirements.'}
              </p>
            </div>

            {/* Summaries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Summary</h3>
                <p className="text-gray-700 leading-relaxed">{resumeSummary}</p>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Description Summary</h3>
                <p className="text-gray-700 leading-relaxed">{jdSummary}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="text-2xl font-bold text-green-600">{matchedSkills.length}</div>
                <div className="text-sm text-gray-600">Matched Skills</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-red-600">{missingSkills.length}</div>
                <div className="text-sm text-gray-600">Missing Skills</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-blue-600">{additionalSkills.length}</div>
                <div className="text-sm text-gray-600">Additional Skills</div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills Analysis</h2>
              
              <div className="space-y-6">
                {/* Matched Skills */}
                <div>
                  <h3 className="flex items-center font-semibold text-green-800 mb-4">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Matched Skills ({matchedSkills.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {matchedSkills.length > 0 ? (
                      matchedSkills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No matched skills found</p>
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                <div>
                  <h3 className="flex items-center font-semibold text-red-800 mb-4">
                    <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                    Missing Skills ({missingSkills.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {missingSkills.length > 0 ? (
                      missingSkills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No missing skills identified</p>
                    )}
                  </div>
                </div>

                {/* Additional Skills */}
                <div>
                  <h3 className="font-semibold text-blue-800 mb-4">
                    Additional Skills ({additionalSkills.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {additionalSkills.length > 0 ? (
                      additionalSkills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No additional skills found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cover Letter Tab */}
        {activeTab === 'cover-letter' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">AI-Generated Cover Letter</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditingCoverLetter(!isEditingCoverLetter)}
                  className={`btn-secondary flex items-center space-x-2 ${isEditingCoverLetter ? 'bg-blue-100 text-blue-700' : ''}`}
                >
                  {isEditingCoverLetter ? <EyeIcon className="h-4 w-4" /> : <PencilIcon className="h-4 w-4" />}
                  <span>{isEditingCoverLetter ? 'Preview' : 'Edit'}</span>
                </button>
                <button
                  onClick={() => copyToClipboard(editableCoverLetter, 'cover-letter')}
                  className={`btn-secondary flex items-center space-x-2 ${copiedCoverLetter ? 'bg-green-100 text-green-700' : ''}`}
                >
                  <DocumentDuplicateIcon className="h-4 w-4" />
                  <span>{copiedCoverLetter ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => downloadDocument(editableCoverLetter, 'cover-letter.txt')}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            
            {editableCoverLetter ? (
              <div>
                {isEditingCoverLetter ? (
                  <textarea
                    value={editableCoverLetter}
                    onChange={(e) => setEditableCoverLetter(e.target.value)}
                    rows={20}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-sans text-sm resize-none"
                    placeholder="Edit your cover letter here..."
                  />
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                      {editableCoverLetter}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No cover letter generated. Please try uploading your documents again.</p>
              </div>
            )}
          </div>
        )}

        {/* Cold Email Tab */}
        {activeTab === 'cold-email' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">AI-Generated Cold Email</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditingColdEmail(!isEditingColdEmail)}
                  className={`btn-secondary flex items-center space-x-2 ${isEditingColdEmail ? 'bg-blue-100 text-blue-700' : ''}`}
                >
                  {isEditingColdEmail ? <EyeIcon className="h-4 w-4" /> : <PencilIcon className="h-4 w-4" />}
                  <span>{isEditingColdEmail ? 'Preview' : 'Edit'}</span>
                </button>
                <button
                  onClick={() => copyToClipboard(editableColdEmail, 'cold-email')}
                  className={`btn-secondary flex items-center space-x-2 ${copiedColdEmail ? 'bg-green-100 text-green-700' : ''}`}
                >
                  <DocumentDuplicateIcon className="h-4 w-4" />
                  <span>{copiedColdEmail ? 'Copied!' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => downloadDocument(editableColdEmail, 'cold-email.txt')}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            
            {editableColdEmail ? (
              <div>
                {isEditingColdEmail ? (
                  <textarea
                    value={editableColdEmail}
                    onChange={(e) => setEditableColdEmail(e.target.value)}
                    rows={15}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-sans text-sm resize-none"
                    placeholder="Edit your cold email here..."
                  />
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                      {editableColdEmail}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No cold email generated. Please try uploading your documents again.</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/upload" className="btn-primary">
            Analyze New Documents
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;