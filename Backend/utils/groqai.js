import "dotenv/config";

const getGroqAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: "groq/compound-mini",
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
            temperature: 0.7,
        }),
    };

    try {
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            options
        );

        if (!response.ok) {
            const error = await response.json();
            console.error("Groq API HTTP Error:", error);
            throw new Error(JSON.stringify(error));
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (err) {
        console.error("Groq API Error:", err.message);
        return "I apologize, but I'm unable to connect to the AI service. Please check your API key configuration.";
    }
};

export default getGroqAPIResponse;
