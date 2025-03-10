
const userService = require("../service/userService")
const transactionService = require("../service/transactionService");
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Please provide all the details" });
        }
        const user = await userService.createUser(name, email, password);
        res.status(201).json({ message: user.message });
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}

exports.verifyUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.verifyUser(email, password);
        if (!user.success) {
            res.status(401).json({ message: user.message });
        }
        res.status(200).json({ message: user.message, token: user.token, name: user.name });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getFinancialInsights = async (req, res) => {
    try {
        const preferences = req.body;
        const results = {};

        for (let key in preferences) {
            const data = preferences[key];
            const req_data = { "preferences": data }

            const response = await fetch(process.env.FLASK_URL + "/financialInsights", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(req_data)
            });

            if (!response.ok) {
                throw new Error(`Flask API Error: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.json(); // Parse JSON response
            results[key] = responseData;
        }

        res.status(200).json({ message: "Success", data: results });

    } catch (err) {
        console.error("Error in getFinancialInsights:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Call service layer to handle file saving
        const filePath = await userService.saveExcelFile(req.file);
        const response = await fetch(process.env.FLASK_URL + "/triggerExcel", {
            method: "POST",
        });
        const data = await response.json();
        if (!req.user || !req.user.email) {
            return res.status(401).json({ error: "Unauthorized - No user email" });
        }
        const userEmail = req.user.email;
        const result = await transactionService.storeTransactions(userEmail, data);

        res.status(200).json({ message: "File processed and transactions saved!", result });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.portalRecharge = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).json({ error: "Amount is required" });
        }

        const result = await walletService.rechargeWallet(userId, amount);
        res.json(result);

    } catch (err) {
        console.error("Error in portalRecharge:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.getDashboard = async (req, res) => {
    try {
        res.status(200).json({ message: "Welcome to the dashboard" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}