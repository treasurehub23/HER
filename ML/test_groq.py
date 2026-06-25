from groq import Groq
from dotenv import load_dotenv
import os 

load_dotenv()  # loads .env file

from keys import GROQ_API_KEY
api_key = GROQ_API_KEY
print("Key found:", api_key is not None)  # should print True

client = Groq(api_key=api_key)  # pass it explicitly

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": "Say hello in pidgin English"}]
)

print(response.choices[0].message.content)