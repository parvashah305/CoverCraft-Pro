import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressCircle from '../components/ProgressCircle';
import { 
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const Results = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [coverLetter, setCoverLetter] = useState(`Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at your company. With my background in full-stack development and experience with React, Node.js, and cloud technologies, I am confident that I would be a valuable addition to your team.

My experience includes:
• 3+ years of React development with modern frameworks
• Strong proficiency in JavaScript, TypeScript, and Python
• Experience with AWS services and Docker containerization
• Proven track record of delivering scalable web applications

I am particularly excited about this opportunity because it aligns perfectly with my passion for building innovative solutions and my desire to work with cutting-edge technologies.

Thank you for considering my application. I look forward to discussing how my skills and enthusiasm can contribute to your team's success.

Best regards,
[Your Name]`);

  const matchScore = 87;
  const skills = {
    matched: ['React', 'JavaScript', 'Node.js', 'Python', 'AWS', 'Docker'],
    missing: ['Kubernetes', 'GraphQL', 'MongoDB', 'Redux'],
    additional: ['TypeScript', 'Vue.js', 'PostgreSQL']
  };

  const suggestions = [
    {
      original: "Developed web applications using various technologies",
      improved: "Built 5+ scalable web applications using React, Node.js, and AWS, serving 10,000+ daily active users",
      type: "enhancement"
    },
    {
      original: "Worked on team projects",
      improved: "Collaborated with cross-functional teams of 8+ members using Agile methodologies to deliver projects 20% ahead of schedule",
      type: "enhancement"
    },
    {
      original: "Missing: Experience with container orchestration",
      improved: "Add: Deployed and managed containerized applications using Docker and Kubernetes in production environments",
      type: "addition"
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    alert('Cover letter copied to clipboard!');
  };

  const downloadCoverLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([coverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'cover-letter.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'skills', name: 'Skills & Keywords' },
    { id: 'cover-letter', name: 'Cover Letter' },
    { id: 'suggestions', name: 'Resume Tips' }
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
          <p className="text-gray-600 mt-2">Here's how your resume matches the job description</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Document Summary</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Resume Summary</h3>
                    <p className="text-gray-600 text-sm">
                      Experienced software engineer with 3+ years in full-stack development, 
                      specializing in React, Node.js, and cloud technologies. Strong background 
                      in building scalable web applications and working in agile environments.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Job Description Summary</h3>
                    <p className="text-gray-600 text-sm">
                      Seeking a software engineer to join our growing team. Responsibilities include 
                      developing modern web applications, working with microservices architecture, 
                      and collaborating with cross-functional teams.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">Strong technical skill alignment</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">Relevant experience level</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                    <span className="text-sm text-gray-700">Some missing keywords</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-sm text-gray-700">Good cultural fit indicators</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Match Score</h2>
              <ProgressCircle percentage={matchScore} />
              <p className="text-gray-600 mt-4 text-sm">
                Your resume is a <strong>{matchScore >= 80 ? 'strong' : matchScore >= 60 ? 'good' : 'fair'}</strong> match for this position
              </p>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Matched Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.matched.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-red-800 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                  Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.missing.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-blue-800 mb-4">Additional Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.additional.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cover Letter Tab */}
        {activeTab === 'cover-letter' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Generated Cover Letter</h2>
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <DocumentDuplicateIcon className="h-4 w-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadCoverLetter}
                  className="btn-primary flex items-center space-x-2"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={20}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
            />
          </div>
        )}

        {/* Suggestions Tab */}
        {activeTab === 'suggestions' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Resume Improvement Suggestions</h2>
              <div className="space-y-6">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-red-800 mb-2">
                          {suggestion.type === 'addition' ? 'Missing' : 'Original'}
                        </h4>
                        <p className="text-sm text-gray-700 bg-red-50 p-3 rounded border-l-4 border-red-400">
                          {suggestion.original}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800 mb-2">
                          {suggestion.type === 'addition' ? 'Suggested Addition' : 'Improved Version'}
                        </h4>
                        <p className="text-sm text-gray-700 bg-green-50 p-3 rounded border-l-4 border-green-400">
                          {suggestion.improved}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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