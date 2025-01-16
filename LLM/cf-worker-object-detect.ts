import dotenv from "dotenv";
import fs from "fs";
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";

dotenv.config();

const worker_api_key = process.env.CF_WORKER_OBJECT_DETECT_API_KEY!;

async function uploadImageFromDisk(filePath) {
  try {
    // Read the image file from disk
    const fileBuffer = fs.readFileSync(filePath);

    // Convert the file buffer to an ArrayBuffer
    const arrayBuffer = fileBuffer.buffer.slice(
      fileBuffer.byteOffset,
      fileBuffer.byteOffset + fileBuffer.byteLength,
    );

    // Convert the ArrayBuffer to a Uint8Array
    const pixelArray = [...new Uint8Array(arrayBuffer)];

    console.log("Prepared pixel array:", pixelArray.slice(0, 100)); // Log the first 100 values for debugging

    // Set up the proxy agent
    const proxyUrl = "http://127.0.0.1:7890"; // Replace with your proxy URL
    const proxyAgent = new HttpsProxyAgent(proxyUrl);

    // Send the POST request to the worker with the proxy agent
    const response = await fetch("https://calm-sun-4f2f.sumtsui.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": worker_api_key, // Include the API key
      },
      body: JSON.stringify({
        image: pixelArray,
      }),
      agent: proxyAgent, // Use the proxy
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Server responded with status ${response.status}: ${errorText}`,
      );
    }

    const result = await response.json();
    console.log("Server response:", result);
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

// Example usage
const filePath = "/Users/sum/Pictures/IMG_4561.jpeg"; // Replace with your image path
uploadImageFromDisk(filePath);
