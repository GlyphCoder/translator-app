from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)

# Using LibreTranslate API (free and open-source)
LIBRETRANSLATE_URL = os.getenv('LIBRETRANSLATE_URL', 'https://libretranslate.de')

SUPPORTED_LANGUAGES = [
    {"code": "en", "name": "English"},
    {"code": "hi", "name": "Hindi"},
    {"code": "gu", "name": "Gujarati"},
    {"code": "es", "name": "Spanish"},
    {"code": "fr", "name": "French"},
    {"code": "de", "name": "German"},
    {"code": "it", "name": "Italian"},
    {"code": "pt", "name": "Portuguese"},
    {"code": "ru", "name": "Russian"},
    {"code": "ja", "name": "Japanese"}
]

@app.route('/languages', methods=['GET'])
def get_languages():
    return jsonify(SUPPORTED_LANGUAGES)

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    text = data.get('text')
    source_lang = data.get('sourceLang')
    target_lang = data.get('targetLang')

    if not all([text, source_lang, target_lang]):
        return jsonify({"error": "Missing parameters"}), 400

    try:
        response = requests.post(
            f"{LIBRETRANSLATE_URL}/translate",
            json={
                "q": text,
                "source": source_lang,
                "target": target_lang,
                "format": "text"
            }
        )
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)