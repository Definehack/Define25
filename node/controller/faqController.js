const faqService = require("../service/faqService");

exports.handleFAQRequest = async(req, res) =>{
    try {
        const { user_query } = req.body;
        // {{console.log(req.body)}}
        if (!user_query) {
            return res.status(400).json({ error: "User query is required" });
        }

        const response = await faqService.faqService(user_query);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


