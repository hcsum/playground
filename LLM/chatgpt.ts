import dotenv from "dotenv";
import * as fs from "fs";
import axios from "axios";

dotenv.config();

// OpenAI API Key
const apiKey = process.env.KATE_GPT_API_KEY;

// Function to encode the image
function encodeImage(imagePath: string): string {
  const image = fs.readFileSync(imagePath);
  return image.toString("base64");
}

// Path to your image
const imagePath =
  "/Users/sum/Downloads/MA_Q3a_10.1-Solving_Equations_Easy_A_Level_Maths_Pure.png";

// Getting the base64 string
const base64Image = encodeImage(imagePath);

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

interface Message {
  role: string;
  content: Array<{
    type: string;
    text?: string;
    image_url?: {
      url: string;
      detail?: string;
    };
  }>;
}

interface Payload {
  model: string;
  messages: Message[];
  max_tokens: number;
}

const payload: Payload = {
  model: "gpt-4o-mini",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "does the image contain the text save my exams? reply yes or no",
        },
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${base64Image}`,
            detail: "low",
          },
        },
      ],
    },
  ],
  max_tokens: 300,
};

async function analyzeImage() {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      payload,
      { headers },
    );
    console.log(response.data.choices);
  } catch (error) {
    console.error("Error:", error?.response?.data?.error?.message);
  }
}

/**
 * [
  {
    index: 0,
    message: {
      role: 'assistant',
      content: 'The image contains a mathematical problem involving the equation \\(x^3 - 5x = 2\\). It includes two parts:\n' +
        '\n' +
        '1. **Part (a)**: It asks the user to rearrange the equation to express \\(x\\) in terms of a formula: \\(x = \\frac{1}{5}(x^3 - 2)\\).\n' +
        '\n' +
        '2. **Part (b)**: It instructs the user to use the iterative formula starting with \\(x_0 = 1\\) to calculate values for \\(x_1\\), \\(x_2\\), and \\(x_3\\), rounding to four decimal places.\n' +
        '\n' +
        'The right side features steps and notes regarding how to manipulate the equation, highlighted in different colors, guiding how to arrive at the solution.'
    },
    logprobs: null,
    finish_reason: 'stop'
  }
]
 */

analyzeImage();
