exports.faqService = async (userQuery) => {
    try {
        const data = { "user_query": userQuery }
        const response = await fetch(process.env.FLASK_URL + "/faqHandler", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        
        const reply = await response.json();
        {{console.log(reply)}}

        return reply.response // Assuming Flask returns {"response": "some answer"}
    } catch (error) {
        console.error("Error calling Flask API:", error);
        throw new Error("Failed to retrieve financial insight.");
    }
}



