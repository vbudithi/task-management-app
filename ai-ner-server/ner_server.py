from flask import Flask, request, jsonify
from transformers import pipeline
import traceback 
import dateparser
import re

app = Flask(__name__)
ner = pipeline("ner", model="dslim/bert-base-NER", grouped_entities=True)

DATE_PATTERNS = r"\b(today|tomorrow|tonight|next week|next month|next year|in \d+ days|in \d+ weeks|in \d+ months|in \d+ years|after \d+ days|after \d+ weeks)\b"

@app.route("/ner", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        text = data.get("inputs", "")

        if not text:
            return jsonify({"error": "No input text provided."}), 400

        matches = re.findall(DATE_PATTERNS, text, re.IGNORECASE)
        result = []

        for match in matches:
            parsed_date = dateparser.parse(match)
            if parsed_date:
                result.append({
                    "entity_group": "DATE",
                    "word": match,
                    "parsed": parsed_date.strftime("%Y-%m-%d")
                })

        return jsonify(result)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8000)

    