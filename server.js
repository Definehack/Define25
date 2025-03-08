// server.js
const express = require('express');
const app = express();
const port = 3000;

// Import the transaction data
const { transactionData } = require('./transaction.js');

// Configuration
const API_TOKEN = "Your Hugging Face token"; // Your Hugging Face token
const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";
const headers = {
    "Authorization": `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json"
};

// Basic FAQ database
const faqDatabase = {
    "what is a stock": "A stock represents ownership in a company. When you buy a stock, you own a small piece of that company.",
    "how do i invest": "To invest, you typically need to open a brokerage account, deposit funds, and then choose investments like stocks, bonds, or mutual funds.",
    "what is interest": "Interest is the cost of borrowing money or the return earned on savings/investments, usually expressed as a percentage."
};

// Hardcoded exchange rates (for demo purposes; replace with API in production)
const exchangeRates = {
    "aed": { "inr": 23.6569 }, // 1 UAE Dirham to Indian Rupee (approx. March 8, 2025)
    "usd": { "inr": 83.50 },   // 1 US Dollar to Indian Rupee
    "inr": { "aed": 0.04227 }  // 1 Indian Rupee to UAE Dirham
};

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Helper function for FAQ checking
function checkFAQ(message) {
    const lowerMessage = message.toLowerCase().trim();
    return faqDatabase[lowerMessage] || null;
}

// Function to convert **text** to <b>text</b>
function formatBoldText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
}

// Helper function to check if the question is finance-related
function isFinanceRelated(message) {
    const lowerMessage = message.toLowerCase().trim();
    const financeKeywords = [
        'stock', 'invest', 'interest', 'finance', 'money', 'budget', 'savings', 'retirement',
        'bank', 'loan', 'credit', 'debt', 'fund', 'bond', 'mutual', 'portfolio', 'economy',
        'financial', 'wealth', 'trade', 'trading', 'currency', 'tax', 'insurance', 'mortgage',
        'dividend', 'equity', 'crypto', 'cryptocurrency', 'market', 'capital', 'asset', 'liability',
        'dirham', 'dharam', 'dh', 'dhs', 'aed', 'rupee', 'rupies', 'inr', 'dollar', 'usd',
        'exchange', 'rate', 'convert', 'fixed', 'deposit', 'account', 'return', 'principal', 'transactions',
        'spent', 'lost', 'expense', 'outcome', 'income'
    ];
    return financeKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Helper function to handle currency conversion
function handleCurrencyConversion(message) {
    const lowerMessage = message.toLowerCase().trim();
    const conversionPattern = /(?:how much is|what is|convert)\s*(\d*\.?\d*)\s*(dirham|dharam|dh|dhs|aed|dollar|usd|rupee|rupies|inr)\s*(in|to|into)?\s*(dirham|dharam|dh|dhs|aed|dollar|usd|rupee|rupies|inr)/i;
    const match = lowerMessage.match(conversionPattern);
    
    if (match) {
        const amount = parseFloat(match[1]) || 1;
        let fromCurrency = match[2].toLowerCase()
            .replace(/dharam|dh|dhs/, 'aed')
            .replace(/dollar/, 'usd')
            .replace(/rupies|rupee/, 'inr');
        let toCurrency = match[4].toLowerCase()
            .replace(/dharam|dh|dhs/, 'aed')
            .replace(/dollar/, 'usd')
            .replace(/rupies|rupee/, 'inr');

        const fromRate = exchangeRates[fromCurrency];
        if (fromRate && fromRate[toCurrency]) {
            const rate = fromRate[toCurrency];
            const convertedAmount = amount * rate;
            return `FinBot: ${amount} ${fromCurrency.toUpperCase()} is approximately <b>${convertedAmount.toFixed(2)} ${toCurrency.toUpperCase()}</b> based on current exchange rates.`;
        } else {
            return "FinBot: Sorry, I don't have the exchange rate for that currency pair.";
        }
    }
    return null;
}

// Helper function to handle transaction data queries
function handleTransactionQuery(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Monthly summary regex patterns
    const monthlySummaryPattern = /(total|sum|summary).*(income|expense|outcome|transaction).*(september|october|november|december|sept|oct|nov|dec)/i;
    const monthIncomePattern = /(income).*(september|october|november|december|sept|oct|nov|dec)/i;
    const monthExpensePattern = /(expense|outcome).*(september|october|november|december|sept|oct|nov|dec)/i;
    
    // Overall summary patterns
    const totalIncomePattern = /(total|sum).*(income)/i;
    const totalExpensePattern = /(total|sum).*(expense|outcome)/i;
    const balancePattern = /(balance|net|difference|profit|loss)/i;
    
    // Last month spending/lost pattern
    const lastMonthSpentPattern = /how much have i (?:totally|total) (?:spent|lost) (?:in|for|during) the last month/i;
    
    // Transaction category patterns
    const categoryPattern = /(job|freelance|consulting|rental|project|commission|bonus|subscription|pet|gift|utility|dining|shopping|holiday|new year|celebration)/i;
    
    // Extract month from query if present
    function extractMonth(msg) {
        const today = new Date('2025-03-08'); // Current date
        const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
        const lastMonthStr = lastMonth.toISOString().slice(0, 7); // e.g., "2025-02"
        
        if (msg.includes('september') || msg.includes('sept')) return '2024-09';
        if (msg.includes('october') || msg.includes('oct')) return '2024-10';
        if (msg.includes('november') || msg.includes('nov')) return '2024-11';
        if (msg.includes('december') || msg.includes('dec')) return '2024-12';
        return lastMonthStr; // Default to last month (2025-02, but adjust to latest data month if needed)
    }
    
    // Calculate total income
    function calculateTotalIncome(month = null) {
        return transactionData
            .filter(t => t.type === 'income' && (month ? t.date.startsWith(month) : true))
            .reduce((sum, t) => sum + t.amount, 0);
    }
    
    // Calculate total expenses
    function calculateTotalExpenses(month = null) {
        return transactionData
            .filter(t => t.type === 'outcome' && (month ? t.date.startsWith(month) : true))
            .reduce((sum, t) => sum + t.amount, 0);
    }
    
    // Get transactions by category
    function getTransactionsByCategory(category) {
        const categoryRegex = new RegExp(category, 'i');
        return transactionData.filter(t => categoryRegex.test(t.name));
    }
    
    // Last N transactions pattern
    const lastTransactionsPattern = /last\s+(\d+)\s+transactions/i;
    const lastTransactionsMatch = lowerMessage.match(lastTransactionsPattern);
    if (lastTransactionsMatch) {
        const count = parseInt(lastTransactionsMatch[1]) || 5;
        
        // Sort transactions by date (newest first)
        const sortedTransactions = [...transactionData].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        // Get the last N transactions
        const recentTransactions = sortedTransactions.slice(0, count);
        
        const transactions = recentTransactions.map(t => {
            const date = new Date(t.date);
            const monthName = date.toLocaleString('default', { month: 'long' });
            return `• ${monthName} ${date.getDate()}: <b>${t.amount.toLocaleString()}</b> (${t.name}) - ${t.type === 'income' ? 'Income' : 'Expense'}`;
        });
        
        return `FinBot: Here are your last ${count} transactions:
        ${transactions.join('\n    ')}`;
    }
    
    // Last month spending
    const month = extractMonth(lowerMessage);
    if (lastMonthSpentPattern.test(lowerMessage)) {
        // Since data only goes to December 2024, use the latest month available
        const latestMonth = '2024-12'; // Adjust dynamically if more data is added
        const expenses = calculateTotalExpenses(latestMonth);
        const monthName = 'December'; // Hardcoded for now based on data
        
        return `FinBot: Based on your transaction data, you have spent a total of <b>${expenses.toLocaleString()}</b> in ${monthName} 2024. Note: The data only includes transactions up to December 2024, so this reflects your spending for that month.`;
    }
    
    // Monthly income or expense summary
    if (monthlySummaryPattern.test(lowerMessage) && month) {
        const monthName = month.split('-')[1] === '09' ? 'September' : 
                          month.split('-')[1] === '10' ? 'October' :
                          month.split('-')[1] === '11' ? 'November' : 'December';
        
        const income = calculateTotalIncome(month);
        const expenses = calculateTotalExpenses(month);
        const balance = income - expenses;
        
        return `FinBot: Here's your <b>${monthName} ${month.split('-')[0]}</b> summary:
        • Total Income: <b>${income.toLocaleString()}</b>
        • Total Expenses: <b>${expenses.toLocaleString()}</b>
        • Net Balance: <b>${balance.toLocaleString()}</b> (${balance >= 0 ? 'Positive' : 'Negative'})`;
    }
    
    // Monthly income summary
    if (monthIncomePattern.test(lowerMessage) && month) {
        const monthName = month.split('-')[1] === '09' ? 'September' : 
                         month.split('-')[1] === '10' ? 'October' :
                         month.split('-')[1] === '11' ? 'November' : 'December';
        
        const income = calculateTotalIncome(month);
        const incomeTransactions = transactionData
            .filter(t => t.type === 'income' && t.date.startsWith(month))
            .map(t => `• ${t.date.split('-')[2]} ${monthName}: <b>${t.amount.toLocaleString()}</b> (${t.name})`);
        
        return `FinBot: Your <b>${monthName} ${month.split('-')[0]}</b> income was <b>${income.toLocaleString()}</b>:
        ${incomeTransactions.join('\n        ')}`;
    }
    
    // Monthly expense summary
    if (monthExpensePattern.test(lowerMessage) && month) {
        const monthName = month.split('-')[1] === '09' ? 'September' : 
                         month.split('-')[1] === '10' ? 'October' :
                         month.split('-')[1] === '11' ? 'November' : 'December';
        
        const expenses = calculateTotalExpenses(month);
        const expenseTransactions = transactionData
            .filter(t => t.type === 'outcome' && t.date.startsWith(month))
            .map(t => `• ${t.date.split('-')[2]} ${monthName}: <b>${t.amount.toLocaleString()}</b> (${t.name})`);
        
        return `FinBot: Your <b>${monthName} ${month.split('-')[0]}</b> expenses were <b>${expenses.toLocaleString()}</b>:
        ${expenseTransactions.join('\n        ')}`;
    }
    
    // Total income summary
    if (totalIncomePattern.test(lowerMessage)) {
        const income = calculateTotalIncome();
        
        // Group by month
        const monthlyIncome = {
            'September': calculateTotalIncome('2024-09'),
            'October': calculateTotalIncome('2024-10'),
            'November': calculateTotalIncome('2024-11'),
            'December': calculateTotalIncome('2024-12')
        };
        
        return `FinBot: Your <b>total income</b> from September to December was <b>${income.toLocaleString()}</b>:
        • September: <b>${monthlyIncome['September'].toLocaleString()}</b>
        • October: <b>${monthlyIncome['October'].toLocaleString()}</b>
        • November: <b>${monthlyIncome['November'].toLocaleString()}</b>
        • December: <b>${monthlyIncome['December'].toLocaleString()}</b>`;
    }
    
    // Total expense summary
    if (totalExpensePattern.test(lowerMessage)) {
        const expenses = calculateTotalExpenses();
        
        // Group by month
        const monthlyExpenses = {
            'September': calculateTotalExpenses('2024-09'),
            'October': calculateTotalExpenses('2024-10'),
            'November': calculateTotalExpenses('2024-11'),
            'December': calculateTotalExpenses('2024-12')
        };
        
        return `FinBot: Your <b>total expenses</b> from September to December were <b>${expenses.toLocaleString()}</b>:
        • September: <b>${monthlyExpenses['September'].toLocaleString()}</b>
        • October: <b>${monthlyExpenses['October'].toLocaleString()}</b>
        • November: <b>${monthlyExpenses['November'].toLocaleString()}</b>
        • December: <b>${monthlyExpenses['December'].toLocaleString()}</b>`;
    }
    
    // Balance query
    if (balancePattern.test(lowerMessage)) {
        const totalIncome = calculateTotalIncome();
        const totalExpenses = calculateTotalExpenses();
        const balance = totalIncome - totalExpenses;
        
        // Monthly breakdown
        const monthlySummary = ['09', '10', '11', '12'].map(m => {
            const month = `2024-${m}`;
            const monthName = m === '09' ? 'September' : m === '10' ? 'October' : m === '11' ? 'November' : 'December';
            const income = calculateTotalIncome(month);
            const expenses = calculateTotalExpenses(month);
            const balance = income - expenses;
            return `• ${monthName}: <b>${balance.toLocaleString()}</b> (Income: ${income.toLocaleString()} - Expenses: ${expenses.toLocaleString()})`;
        });
        
        return `FinBot: Your <b>overall balance</b> from September to December is <b>${balance.toLocaleString()}</b>:
        • Total Income: <b>${totalIncome.toLocaleString()}</b>
        • Total Expenses: <b>${totalExpenses.toLocaleString()}</b>
        
        Monthly breakdown:
        ${monthlySummary.join('\n        ')}`;
    }
    
    // Category queries
    const categoryMatch = lowerMessage.match(categoryPattern);
    if (categoryMatch) {
        const category = categoryMatch[1].toLowerCase();
        const relatedTransactions = getTransactionsByCategory(category);
        
        if (relatedTransactions.length > 0) {
            const transactions = relatedTransactions.map(t => {
                const date = new Date(t.date);
                const monthName = date.toLocaleString('default', { month: 'long' });
                return `• ${monthName} ${date.getDate()}: <b>${t.amount.toLocaleString()}</b> (${t.name}) - ${t.type === 'income' ? 'Income' : 'Expense'}`;
            });
            
            const total = relatedTransactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0);
            
            return `FinBot: Here are your transactions related to "${category}":
            ${transactions.join('\n            ')}
            
            Net impact on your finances: <b>${total.toLocaleString()}</b> ${total >= 0 ? '(Positive)' : '(Negative)'}`;
        }
    }

    return null;
}

// Chat endpoint
app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        // Check if the question is finance-related
        if (!isFinanceRelated(message)) {
            const response = "FinBot: I can't help you with that, can you ask about something related to finance?";
            return res.json({ response });
        }

        // Check for transaction data query
        const transactionResponse = handleTransactionQuery(message);
        if (transactionResponse) {
            return res.json({ response: transactionResponse });
        }

        // Check for currency conversion
        const conversionResponse = handleCurrencyConversion(message);
        if (conversionResponse) {
            return res.json({ response: conversionResponse });
        }

        // Check FAQ
        const faqAnswer = checkFAQ(message);
        if (faqAnswer) {
            const formattedResponse = formatBoldText(`FinBot: ${faqAnswer}`);
            return res.json({ response: formattedResponse });
        }

        // Fallback to model using built-in fetch
        const prompt = `[INST] You are a FinTech expert. Provide a concise answer to this finance-related question with numbered steps where applicable, using **text** to highlight key points. If the question is not finance-related, respond only with: "I can't help you with that, can you ask about something related to finance?": ${message} [/INST]`;
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_length: 150,
                    temperature: 0.7,
                    top_p: 0.95
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
        }

        const data = await response.json();
        if (!data[0]?.generated_text) {
            throw new Error('Invalid response format from API');
        }

        const botResponse = formatBoldText(
            data[0].generated_text.replace(prompt, "").trim()
        );
        res.json({ response: `FinBot: ${botResponse}` });
    } catch (error) {
        console.error('Error:', error.message);
        const errorResponse = formatBoldText(`FinBot: Sorry, I encountered an error: ${error.message}`);
        res.status(500).json({ response: errorResponse });
    }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
