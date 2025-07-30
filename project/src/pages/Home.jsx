import { Link } from 'react-router-dom';
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  PencilSquareIcon 
} from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Analysis',
      description: 'Advanced algorithms analyze your resume and job descriptions for perfect matches.',
    },
    {
      icon: ChartBarIcon,
      title: 'Match Scoring',
      description: 'Get detailed compatibility scores and insights to improve your applications.',
    },
    {
      icon: PencilSquareIcon,
      title: 'Cover Letter Generator',
      description: 'Generate personalized cover letters tailored to specific job requirements.',
    },
    {
      icon: DocumentTextIcon,
      title: 'Resume Enhancement',
      description: 'Receive suggestions to optimize your resume for better ATS compatibility.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Perfect Your Job Applications with{' '}
              <span className="text-primary-600">AI Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              CoverCraft Pro analyzes your resume against job descriptions, 
              providing match scores, keyword optimization, and personalized cover letters 
              to help you land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/upload" className="btn-primary text-lg">
                Start Analyzing
              </Link>
              <button className="btn-secondary text-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features for Job Seekers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to optimize your job applications and stand out from the competition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center group hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-4 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Boost Your Job Search?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of job seekers who have improved their applications with CoverCraft Pro.
          </p>
          <Link to="/upload" className="btn-primary text-lg">
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;