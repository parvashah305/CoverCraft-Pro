
import re
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_bullets(resume_text: str):
    return re.findall(r"(?:[-•]\s*)(.+)", resume_text)

def improve_bullet(bullet: str) -> str:
    prompt = f"""
You are a professional resume writing assistant.

Improve the following bullet point to be:
- More impactful
- Include metrics (e.g., 25% improvement, $10k saved)
- Written in a strong action-oriented tone
- Suitable for a professional resume

Original Bullet: "{bullet}"
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You write and enhance resume bullet points."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"❌ Error rewriting bullet: {str(e)}"

def improve_resume_bullets(resume_text: str):
    bullets = extract_bullets(resume_text)
    return [{"original": b, "improved": improve_bullet(b)} for b in bullets if len(b.strip()) > 5]