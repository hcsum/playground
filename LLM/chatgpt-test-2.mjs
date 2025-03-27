import { deepseek } from "@ai-sdk/deepseek";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import dotenv from "dotenv";

dotenv.config();

const { text } = await generateText({
  // model: deepseek("deepseek-chat"),
  model: openai("gpt-4o-mini"),
  prompt: "Write a vegetarian lasagna recipe for 4 people.",
});

console.log(text);
