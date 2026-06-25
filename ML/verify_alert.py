from groq import Groq
import os
import json
from keys import GROQ_API_KEY
api_key = GROQ_API_KEY
client = Groq(api_key=api_key)

#Phase 1: Transaction verification with text
def verify_alert(alert_text):
    prompt = f"""You are a fraud detection assistant for Nigerian market traders.

    A FAKE alert usually has one or more of these:
    - "Value Date" set to today or a future date (banks don't do this)
    - No transaction reference number
    - Amount written in words only, not numbers
    - Sent via WhatsApp screenshot instead of directly from bank SMS
    - Sender name is vague like "A CUSTOMER" or misspelled
    - GTBank real SMS comes from "GTBank" not a random number

    A REAL alert has all of these:
    - Comes directly as SMS from the bank shortcode
    - Has a transaction reference number
    - Shows both sender name and account number
    - Amount is in numbers

    Alert to analyze:
    {alert_text}

    Respond in JSON only, no explanation outside the JSON:
    {{"verdict": "REAL or FAKE", "confidence": 0-100, "reason": "one short sentence in plain English explaining why"}}"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    result = response.choices[0].message.content.strip()
    return json.loads(result)

    parsed = json.loads(result)
    if parsed["confidence"] < 75:
        parsed["verdict"] = "UNCERTAIN"
        return parsed

#Phase 1: Transaction verification with image
import base64

def verify_alert_from_image(image_path):
    # convert image to base64
    with open(image_path, "rb") as f:
        image_data = base64.b64encode(f.read()).decode("utf-8")

    response = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[{
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{image_data}"
                    }
                },
                {
                    "type": "text",
                    "text": """You are a Nigerian payment fraud detection expert.
Look at this payment alert screenshot and determine if it is REAL or FAKE.

A FAKE alert usually has:
- Value Date set to today or future date
- No transaction reference number
- Amount in words only
- Vague sender name

A REAL alert has:
- Transaction reference number
- Sender name and account number
- Amount in numbers

Respond in JSON only:
{"verdict": "REAL or FAKE", "confidence": 0-100, "reason": "one sentence in plain English"}"""
                }
            ]
        }]
    )

    result = response.choices[0].message.content.strip()
    return json.loads(result)


# Test it
if __name__ == "__main__":
    result = verify_alert_from_image("C:/Users/DELL/Pictures/Screenshots/Screenshot 2026-06-25 151712.png")
    print("Verdict:", result["verdict"])
    print("Confidence:", result["confidence"])
    print("Reason:", result["reason"])
# Test
fake_alert = """
Acct:429****079

DT:25/06/2026 11:45:07 AM

NIP//Paystack/CowrywiseCowrywi

CR Amt:3,900.00

Bal:3,911.74

Dial *966# for quick airtime/Data purchase
"""

# result = verify_alert(fake_alert)
# print("Verdict:", result["verdict"])
# print("Confidence:", result["confidence"])
# print("Reason:", result["reason"])

