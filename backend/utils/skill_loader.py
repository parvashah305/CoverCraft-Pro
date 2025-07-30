import csv

def load_skills_from_csv(path="data/skills.csv"):
    skills = []
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            raw_skill = row.get("Skill")
            if raw_skill:
                clean_skill = raw_skill.strip().lower().replace('"', '')
                skills.append(clean_skill)
    return skills