const { GoogleGenerativeAI } = require("@google/generative-ai");

// Function to generate AI response
export async function generateAIResponse(inputText) {
    try {
        // Define your API endpoint URL and API key here
        // Make sure to include these imports:
        const API_KEY = "api_key";
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const template = `
        You are a virtual assistant tasked with responding to user queries.
        Your main goal and aim is to help users assist in typing messsages so for that you need to be quick and reliable.
        Given the context and instructions, you are to generate the most appropriate response to each query.
        Give short and concise responses to all queries. 
        All Queries are to be treated as independent
        Context and Instructions for Task 1:
        If the given text is a short sentence or phrase that is not a question and 
        does not contain a question mark or words like suggest,give or any interogative words 
        then generate a more creative version of the text or paraphrase it while 
        maintaining the original meaning. Ensure that the tone, style,
        and creativity are enhanced.
        Context and Instructions for Task 2:
        If the given text is a command or contains a clear instruction, 
        execute it as described without altering its meaning or intent. 
        Ensure the response aligns precisely with the instruction.
        Don't given task number as output only give the result.
        Given text: 
        `;
        const prompt = template + inputText;

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
    } catch (error) {
        console.error("Error generating AI response:", error);
        throw error;
    }
}

