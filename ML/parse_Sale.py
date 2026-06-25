import json
from groq import Groq

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

    result = response.choices[0].message.content.strip()
    return json.loads(result)


# Test with different message styles
if __name__ == "__main__":
    tests = [
        "Sold 2 bags of rice to Mama Chioma for 18000",
        "Customer took fabric 0f 20k on credit, she go pay Friday, na Bisi",
        "I don sell 5 crates of egg for 7500",
        "Abeg wetin be the price of tomato",
        "Ade buy shoe for 15k, he pay complete"
    ]

    for msg in tests:
        print(f"\nMessage: {msg}")
        result = parse_sale(msg)
        print(json.dumps(result, indent=2))