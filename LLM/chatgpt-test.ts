import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
  // secret: "127b2f9d-03c4-45e1-9a81-23301ce8a6c6",
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
          text: "what is the meaning of ci/cd?",
        },
      ],
    },
  ],
  max_tokens: 300,
};

async function run() {
  try {
    const response = await axios.post(
      // "https://c47660b8-chatgpt-worker-generic.sumtsui.workers.dev/chat/completions",
      "https://api.openai.com/v1/chat/completions",
      payload,
      {
        headers,
        // proxy: {
        //   host: "127.0.0.1",
        //   port: 7890,
        //   protocol: "http",
        // },
      },
    );
    console.log(response.data.choices);
  } catch (error) {
    console.log("error", error);
    console.error("Error:", error?.response?.data?.error?.message);
  }
}

run();
