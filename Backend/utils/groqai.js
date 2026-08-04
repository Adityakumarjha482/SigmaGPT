import "dotenv/config";

const getGroqAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
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
            throw new Error(JSON.stringify(error));
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (err) {
        console.error("Groq API Error:", err.message);
        return "Sorry, something went wrong while contacting the AI.";
    }
};

export default getGroqAPIResponse;