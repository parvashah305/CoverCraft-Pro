import os
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from utils.file_parser import extract_text_from_pdf, extract_text_from_docx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def extract_text_from_file(path):
    """Extract text from uploaded file based on file extension"""
    file_extension = os.path.splitext(path)[1].lower()
    
    if file_extension == '.pdf':
        return extract_text_from_pdf(path)
    elif file_extension in ['.docx', '.doc']:
        return extract_text_from_docx(path)
    elif file_extension == '.txt':
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    else:
        
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()
        except Exception as e:
            return f"Error reading file: {str(e)}"

@app.post("/upload")
async def upload_files(
    resume: UploadFile = File(...),
    jd_file: UploadFile = File(None),
    jd_text: str = Form(None)
):
    
    resume_path = os.path.join(UPLOAD_DIR, resume.filename)
    with open(resume_path, "wb") as f:
        f.write(await resume.read())

    if jd_file and jd_file.filename:
        jd_path = os.path.join(UPLOAD_DIR, jd_file.filename)
        with open(jd_path, "wb") as f:
            f.write(await jd_file.read())
        jd_content = extract_text_from_file(jd_path)
    elif jd_text:
        jd_content = jd_text
    else:
        return {"error": "Please provide either JD file or JD text"}

    resume_content = extract_text_from_file(resume_path)

    return {
        "resume_text": resume_content,
        "jd_text": jd_content
    }