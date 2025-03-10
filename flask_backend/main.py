from flask import Flask, request, jsonify
from flask_cors import CORS
from src.news import News
from src.faq_chatbot import FAQChatBot
from src.excelhandler import ExcelHandler

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Welcome to FlowFi!"

@app.route('/financialInsights', methods = ['POST'])
def extract_news():
    # used to extract the news based on user preferences
    data = request.json
    preferences = data['preferences']
    news = News()
    news_data = news.get_everything(preferences)
    return jsonify(news_data)
    
@app.route('/faqHandler', methods = ['POST'])
def faq_handler():
    # used to access the FAQ chatbot
    data = request.json
    user_query = data['user_query']
    chatbot = FAQChatBot()
    response = chatbot.get_financial_insight(user_query)
    return jsonify({"response": response})
    
@app.route('/triggerExcel', methods = ['POST'])
def trigger_excel():
    # used to convert the excel file to json
    excel = ExcelHandler()
    data = excel.get_json()
    return jsonify(data)
        
if __name__ == '__main__':
    app.run(debug = True, port = 8080)