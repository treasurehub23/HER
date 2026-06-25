from flask import Flask, request, jsonify
import json
from groq import Groq

app = Flask(__name__)
from keys import GROQ_API_KEY
api_key = GROQ_API_KEY
client = Groq(api_key=api_key)  

def parse_sale(message):
    prompt = f"""You are a bookkeeping assistant for Nigerian market traders.
Extract sales information from this message. The trader may write in English or Pidgin.

Message: {message}

Respond in JSON only, no extra text:
{{
  "is_sale": true or false,
  "item": "item name or null",
  "quantity": number or null,
  "amount": number in naira or null,
  "customer_owes": true or false,
  "customer_name": "name or null"
}}

If the message is not about a sale, set is_sale to false and everything else to null."""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return json.loads(response.choices[0].message.content.strip())


def verify_alert(alert_text):
    prompt = f"""You are a Nigerian payment fraud detection expert.

A FAKE alert usually has:
- Value Date set to today or future date
- No transaction reference number
- Amount in words only
- Vague sender name

A REAL alert has:
- Transaction reference number
- Sender name and account number
- Amount in numbers

Alert: {alert_text}

Respond in JSON only:
{{"verdict": "REAL or FAKE", "confidence": 0-100, "reason": "one sentence in plain English"}}"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return json.loads(response.choices[0].message.content.strip())


@app.route("/parse-sale", methods=["POST"])
def parse_sale_endpoint():
    data = request.json
    message = data.get("message", "")
    if not message:
        return jsonify({"error": "No message provided"}), 400
    result = parse_sale(message)
    return jsonify(result)


@app.route("/verify-alert", methods=["POST"])
def verify_alert_endpoint():
    data = request.json
    alert_text = data.get("alert_text", "")
    if not alert_text:
        return jsonify({"error": "No alert text provided"}), 400
    result = verify_alert(alert_text)
    return jsonify(result)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "running"})


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)