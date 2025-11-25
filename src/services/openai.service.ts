import OpenAI from 'openai';
import { createAnalysisPrompt, DOKA_SYSTEM_PROMPT } from '../constants/analysis-prompt';
import { toAnalysisProduct } from '../types/product';
import type { AnalysisResponse, AnalysisErrorResponse } from '../types/analysis';
import dokaData from '../constants/doka-data';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function analyzeImage(imageFile: File): Promise<AnalysisResponse> {
  try {
    // Convert image to base64
    const base64Image = await imageToBase64(imageFile);

    // Prepare products for analysis (without imageUrl)
    const productsForAnalysis = dokaData.products.map(toAnalysisProduct);

    // Create the prompt
    const userPrompt = createAnalysisPrompt({ products: productsForAnalysis });

    // Call OpenAI Vision API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: DOKA_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: userPrompt,
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image,
                detail: 'auto',
              },
            },
          ],
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    // Parse the response
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Strip markdown code fences if present (OpenAI sometimes wraps JSON in ```json...```)
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```')) {
      // Remove opening fence (```json or ```)
      cleanedContent = cleanedContent.replace(/^```(?:json)?\n?/, '');
      // Remove closing fence
      cleanedContent = cleanedContent.replace(/\n?```$/, '');
      cleanedContent = cleanedContent.trim();
    }

    // Parse JSON response
    const parsedResponse = JSON.parse(cleanedContent);

    // Check if the response is an error
    if ('error' in parsedResponse) {
      const errorResponse = parsedResponse as AnalysisErrorResponse;
      const errorMessage = errorResponse.reason
        ? `${errorResponse.error}: ${errorResponse.reason}`
        : errorResponse.error;
      throw new Error(errorMessage);
    }

    const analysisResult: AnalysisResponse = parsedResponse;
    return analysisResult;
  } catch (error) {
    console.error('Error analyzing image:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to analyze image: ${error.message}`);
    }
    throw new Error('Failed to analyze image: Unknown error');
  }
}
