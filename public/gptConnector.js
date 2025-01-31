// const express = require("express");
// const { OpenAI } = require("openai");
// const app = express();

import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

async function generateAnswer() {
    const question = document.getElementById("question")

    console.log("test1")
    console.log(question)

    try {

        const prompt = `how do I write a hello world in python`;

        console.log('Prompt:', prompt);

        const completions = openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            max_tokens: 25,
            messages: [
                {
                    role: "system",
                    content: "you are a coding debug helper. The users will copy and paste in their code and ask you to debug their code. "
                },
                { role: "user", content: prompt }
            ]
        });
        console.log('API Response:', completions);

        let summary = completions?.choices?.[0]?.message?.content || "Summary not available";
        console.log('Summary:', summary);

        // if summary contains double quotes, make them single quotes
        summary = summary.replace(/"/g, "'");

        if (activity.type === "code") {
            return `${summary}`;
        } else if (activity.type === "subgoal") {
            return `test subgoal ${activity.id}: ${summary}`;
        } else {
            return `test placeholder test: ${summary}`;
        }

    } catch (error) {
        console.error("Error generating title:", error.message);
        return `Code changes in ${activity.file}`;
    }
}