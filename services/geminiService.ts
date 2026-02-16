import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL, SYSTEM_INSTRUCTION } from "../constants";

/**
 * Generates content using the Gemini API.
 * Uses the latest SDK patterns as per guidelines.
 */
export const generateResponse = async (prompt: string): Promise<string> => {
  // Always create a new instance or ensure the key is fresh from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const text = response.text;
    
    if (text === undefined) {
      throw new Error("The model returned an empty response.");
    }

    return text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Handle specific error messages if needed, e.g., for "Requested entity was not found."
    throw new Error(error.message || "An unexpected error occurred with the AI service.");
  }
};