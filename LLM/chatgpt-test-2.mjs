import { deepseek } from "@ai-sdk/deepseek";
import { generateText } from "ai";
import dotenv from "dotenv";

dotenv.config();

const { text } = await generateText({
  model: deepseek("deepseek-chat"),
  prompt: "Write a vegetarian lasagna recipe for 4 people.",
});

console.log(text);
