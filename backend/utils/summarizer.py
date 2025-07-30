
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def summarize_text(text: str, label: str = "resume") -> str:
    prompt = f"""
Summarize the following {label} in 4-5 concise sentences. 
Make sure to include:
- Full name (if present)
- Email address
- Phone number
- Personal website or portfolio
- GitHub or LinkedIn (if present)
- Key skills, technologies, and tools
- Relevant experiences, education, and achievements

Avoid using gendered pronouns (like he/she). Use the person's full name or refer to them neutrally (e.g., "the candidate", "Parva Shah", or "they").

Text:
{text}
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": f"You are a professional {label} summarization assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5
        )
        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"Error generating summary: {str(e)}"