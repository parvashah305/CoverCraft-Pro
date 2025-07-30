import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_cold_email(resume_summary, jd_summary):
    prompt = f"""
You are a career assistant writing cold emails for job seekers.

Write a short, personalized cold email for a candidate reaching out to HR or a hiring manager about an open job opportunity.

### Resume Summary:
{resume_summary}

### Job Description Summary:
{jd_summary}

Guidelines:
- Start with a compelling subject line.
- Write in a professional but friendly tone.
- Mention relevant experience, interest in the role, and a unique value the candidate can bring.
- Keep it concise: no more than 2 short paragraphs.
- If the resume includes a portfolio, GitHub, or LinkedIn, include it in the closing line.
- End with name, email, and phone number (as found in the resume).
- Do NOT use placeholders like [Company Name] or [Hiring Manager].

Only return the full cold email text including the subject.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You write personalized cold emails for job opportunities."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.6
    )

    return response.choices[0].message.content.strip()