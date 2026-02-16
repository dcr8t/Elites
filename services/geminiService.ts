import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL, SYSTEM_INSTRUCTION } from "../constants";

// Initialize the client with the environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates content based on a user prompt using the configured Gemini model.
 * 
 * @param prompt The user's input text
 * @returns The generated text response
 */
export const generateResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    // Extract text directly from the response object
    const text = response.text;
    
    if (!text) {
      throw new Error("No response text generated.");
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};