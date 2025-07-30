# 🎯 CoverCraft Pro

**AI-Powered Resume Analysis & Job Application Assistant**

CoverCraft Pro is a comprehensive web application that leverages artificial intelligence to analyze resumes, match them against job descriptions, and generate personalized cover letters and cold emails. Built with modern technologies and powered by OpenAI's GPT models.


## ✨ Features

### 🔍 **Smart Resume Analysis**
- **Multi-format Support**: Upload PDF, DOCX, or plain text files
- **AI-Powered Text Extraction**: Advanced parsing for clean text extraction
- **Skill Matching**: Intelligent comparison between resume and job requirements
- **Gap Analysis**: Identify missing skills and improvement areas

### 📊 **Interactive Dashboard**
- **Visual Match Score**: Animated circular progress indicators with color-coded scoring
- **Detailed Breakdown**: Comprehensive analysis across multiple tabs
- **Real-time Feedback**: Instant processing with progress tracking

### 🤖 **AI Content Generation**
- **Resume Summaries**: Professional AI-generated resume summaries
- **Job Description Analysis**: Key requirements and role breakdown
- **Cover Letter Generation**: Personalized cover letters tailored to each job
- **Cold Email Creation**: Professional outreach emails for networking

### ✏️ **Editable Documents**
- **Live Editing**: Real-time editing of generated content
- **Preview Mode**: Toggle between edit and preview modes
- **Export Options**: Copy to clipboard or download as text files

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Drag & Drop**: Intuitive file upload interface
- **Progress Tracking**: Visual feedback during analysis
- **Professional Styling**: Clean, modern interface with TailwindCSS

## 🏗️ Tech Stack

### **Backend**
- **Framework**: FastAPI (Python)
- **AI Integration**: OpenAI GPT-4o-mini
- **Text Processing**: spaCy, NLTK
- **File Parsing**: pdfplumber, python-docx
- **Environment**: Python 3.12+

### **Frontend**
- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS
- **Icons**: Heroicons
- **HTTP Client**: Axios
- **Routing**: React Router

### **AI & ML**
- **Language Model**: OpenAI GPT-4o-mini
- **Skill Extraction**: Custom NLP pipeline with spaCy

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.12+
- OpenAI API key

### 1. Clone the Repository
```bash
git clone https://github.com/parvashah305/CoverCraft-Pro.git
cd CoverCraft-Pro
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Create .env file
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env

# Start the backend server
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd project

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Start the development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000

## 📁 Project Structure

```
CoverCraft-Pro/
├── backend/                    # FastAPI backend
│   ├── main.py                # Main application file
│   ├── utils/                 # Utility modules
│   │   ├── file_parser.py     # Document parsing
│   │   ├── skill_extractor.py # Skill analysis
│   │   ├── summarizer.py      # AI summarization
│   │   ├── cover_letter.py    # Cover letter generation
│   │   └── cold_mail_generator.py # Cold email generation
│   ├── data/                  # Skills database
│   ├── uploads/               # Uploaded files storage
│   └── requirements.txt       # Python dependencies
├── project/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/            # Main pages
│   │   ├── services/         # API services
│   │   └── assets/           # Static assets
│   ├── public/               # Public assets
│   └── package.json          # Node dependencies
└── README.md                 # Project documentation
```

## 🔧 API Endpoints

### **Core Endpoints**
- `POST /upload` - Upload and extract text from documents
- `POST /summarize` - Generate AI summaries
- `POST /extract-skills` - Extract skills from text
- `POST /match-skills` - Compare resume and job skills
- `POST /generate-cover-letter` - Create personalized cover letters
- `POST /generate-cold-email` - Generate cold outreach emails


## 🎯 How It Works

1. **Upload Documents**: Users upload their resume and provide a job description
2. **Text Extraction**: Advanced parsing extracts clean text from various file formats
3. **AI Analysis**: Multiple AI models analyze the content for skills, experience, and fit
4. **Skill Matching**: Intelligent comparison identifies matches, gaps, and additional skills
5. **Content Generation**: AI creates personalized cover letters and cold emails
6. **Interactive Results**: Users can view, edit, and export all generated content

## 🌟 Key Features in Detail

### **Smart Skill Matching**
- Uses advanced NLP to identify technical and soft skills
- Compares against a comprehensive skills database (900+ skills)
- Provides percentage-based matching with detailed explanations

### **AI-Powered Content Generation**
- **Summaries**: Concise, professional summaries highlighting key qualifications
- **Cover Letters**: Tailored to specific job requirements with proper formatting
- **Cold Emails**: Professional outreach templates with subject lines

### **Enhanced User Experience**
- **Real-time Editing**: Live preview and editing capabilities
- **Visual Feedback**: Color-coded scoring and animated progress indicators
- **Export Options**: Multiple ways to save and share generated content

## 🔒 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

## 👨‍💻 Author

**Parva Shah** - Full Stack Developer & AI Enthusiast

[![GitHub](https://img.shields.io/badge/GitHub-parvashah305-black?style=flat-square&logo=github)](https://github.com/parvashah305)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-parvashah305-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/parvashah305/)
[![Portfolio](https://img.shields.io/badge/Portfolio-parvashah.vercel.app-green?style=flat-square&logo=vercel)](https://parvashah.vercel.app)

*Passionate about building innovative AI-powered applications that solve real-world problems. Specializing in full-stack development with modern technologies and machine learning integration.*

## 🙏 Acknowledgments

- **OpenAI** for providing powerful language models
- **spaCy** for natural language processing capabilities
- **React** and **FastAPI** communities for excellent frameworks
- **TailwindCSS** for beautiful, responsive styling


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
