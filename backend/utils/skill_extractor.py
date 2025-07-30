import spacy
from spacy.matcher import PhraseMatcher
from utils.skill_loader import load_skills_from_csv

nlp = spacy.load("en_core_web_sm") 
skills = load_skills_from_csv()

matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
patterns = [nlp.make_doc(skill) for skill in skills]
matcher.add("SKILLS", patterns)

def extract_skills(text):
    doc = nlp(text.lower())
    matches = matcher(doc)
    found = set([doc[start:end].text for _, start, end in matches])
    return sorted(found)


def compare_skills(resume_text, jd_text):
    resume_set = set(extract_skills(resume_text))
    jd_set = set(extract_skills(jd_text))

    matched = sorted(resume_set & jd_set)
    missing = sorted(jd_set - resume_set)
    additional = sorted(resume_set - jd_set)

    score = round((len(matched) / len(jd_set) * 100), 2) if jd_set else 0

    return {
        "match_score": score,
        "matched_keywords": matched,
        "missing_keywords": missing,
        "additional_skills": additional,
        "explanation": explain_score(score)
    }

def explain_score(score):
    if score >= 80:
        return "Excellent match. You cover most of the required skills."
    elif score >= 60:
        return "Good match. A few key skills could be added."
    elif score >= 40:
        return "Moderate match. Consider improving skill alignment."
    else:
        return "Low match. Your resume lacks many required skills."