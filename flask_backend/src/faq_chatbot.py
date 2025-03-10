from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

class FAQChatBot:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-1.5-flash")
        self.chat = self.model.start_chat(history=[])
        self.system_prompt = (
            "You are a financial assistant. You will only answer questions related to finance, "
            "including investment strategies, market trends, personal finance, budgeting, and "
            "other financial topics. If a user asks about a non-financial topic, politely decline "
            "to answer and redirect them to financial inquiries."
            "The answer should be brief and concise enough and should be to the point."
            "The response should give sustainable fintech solutions"
        )
        
    def get_financial_insight(self, user_query):
        response = self.chat.send_message(user_query)
        
        if hasattr(response, 'text'):
            return response.text.strip()
        return "Sorry, I couldn't understand your query. Please try again."