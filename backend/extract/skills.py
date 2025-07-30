import os
import json
import re
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_json_block(text):
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        return {"error": "No valid JSON found in response."}
    except json.JSONDecodeError as e:
        return {"error": f"JSON decode error: {str(e)}"}

def compare_resume_jd(resume_text, jd_text):
    prompt = f"""
You are an AI trained to evaluate how well a candidate's resume matches a job description.

### Resume:
{resume_text}

### Job Description:
{jd_text}

Evaluate the resume and give a JSON response like:
{{
  "match_score": <score out of 100>,
  "matched_keywords": [list of matching skills/tools/phrases],
  "missing_keywords": [important JD terms not in resume],
  "additional_skills": [skills/tools/phrases present in resume but not in job description],
  "explanation": "A short paragraph explaining the score"
}}

Only return valid JSON.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a resume screening assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        content = response.choices[0].message.content.strip()
        return extract_json_block(content)

    except Exception as e:
        return {"error": str(e)}