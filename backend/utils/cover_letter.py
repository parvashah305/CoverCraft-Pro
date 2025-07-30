import os
from dotenv import load_dotenv
from openai import OpenAI
from datetime import datetime  

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_cover_letter(resume_summary, jd_summary):
    current_date = datetime.now().strftime("%B %d, %Y")

    prompt = f"""
You are a professional career assistant. Write a personalized 3-paragraph cover letter for a job application based on the following:

### Resume Summary:
{resume_summary}

### Job Description Summary:
{jd_summary}

Include today's date at the top of the letter as "{current_date}".

- The tone should be formal yet enthusiastic.
- Do NOT use placeholders like [Company Name].
- Sign off using the name mentioned in the resume summary.
- Return only the letter.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You write tailored cover letters for job applications."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.5
    )

    return response.choices[0].message.content.strip()