const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});


// Test route
app.get("/", (req, res) => {
    res.send("AI Code Review Server Running 🚀");
});


// AI Code Review API
app.post("/review", async (req, res) => {

    try {

        const { code, language } = req.body;


        if (!code) {
            return res.status(400).json({
                error: "Code is required"
            });
        }

        const response = await groq.chat.completions.create({

            model: "openai/gpt-oss-120b",

            messages: [

                {
                    role: "system",
                    content: `
You are an expert software engineer and AI code reviewer.

Analyze the given code and provide a clean Markdown formatted review.

Include these sections:

## Bugs and Issues
Find bugs, errors, or possible problems.

## Suggestions
Give improvements to make the code better.

## Best Practices
Mention important coding practices.

## Time Complexity
Only write Big-O notation.
Example:
O(n)

## Space Complexity
Only write Big-O notation.
Example:
O(1)

## Optimized Code
Provide improved and cleaner code.

Rules:
- Do not explain Time Complexity.
- Do not explain Space Complexity.
- Only provide Big-O notation for complexity.
- Keep the response concise.
- Use Markdown headings.
`
                },

                {
                    role: "user",
                    content: `
Review this ${language || "programming"} code:

${code}
`
                }

            ],

            temperature: 0.3
        });


        const review = response.choices[0].message.content;


        res.json({
            success: true,
            review: review
        });


    } catch (error) {

        console.log("AI Error:", error);

        res.status(500).json({
            error: "AI review failed"
        });

    }

});


// Server start
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});