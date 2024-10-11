import spacy
import sys
import json


class ResumeParser:
    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")

    def parse(self, resume_text):
        doc = self.nlp(resume_text)
        
        # Extract basic information
        name = self._extract_name(doc)
        email = self._extract_email(doc)
        skills = self._extract_skills(doc)

        return {
            "name": name,
            "email": email,
            "skills": skills
        }

    def _extract_name(self, doc):
        for ent in doc.ents:
            if ent.label_ == "PERSON":
                return ent.text
        return None

    def _extract_email(self, doc):
        for token in doc:
            if token.like_email:
                return token.text
        return None

    def _extract_skills(self, doc):
        # This is a simple implementation. In a real-world scenario,
        # you'd want a more comprehensive list of skills and possibly use NER.
        skills = []
        skill_keywords = ["python", "javascript", "java", "c++", "machine learning", "data analysis"]
        for token in doc:
            if token.text.lower() in skill_keywords:
                skills.append(token.text)
        return skills

if __name__ == "__main__":
    parser = ResumeParser()
    resume_text = sys.stdin.read()
    result = parser.parse(resume_text)
    print(json.dumps(result))