import { OpenAI } from 'openai';
import { VibeAnalysis } from '@/types';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is required');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeVibe(imageBase64: string): Promise<VibeAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-123",
      messages: [
        {
          role: "system",
          content: `You are a professional venue analyst. Analyze the uploaded image of a restaurant, bar, or cafe and provide a detailed vibe analysis in JSON format. Be accurate and observant about details in the image.

Return your analysis in this exact JSON format:
{
  "crowded": number (0-100 scale indicating how busy/crowded the venue appears),
  "open_tables": number (count of available tables if restaurant/cafe, omit if bar),
  "open_bar_seats": number (count of available bar seats if bar, omit if restaurant/cafe),
  "business_type": "bar" | "restaurant" | "cafe",
  "overall_vibe": "One concise sentence describing the atmosphere and ambiance"
}

Guidelines:
- crowded: 0-30 is quiet, 30-70 is moderate, 70-100 is busy
- Count visible empty/available seating carefully
- business_type: "bar" if primarily drink-focused with bar seating, "restaurant" if table dining focused, "cafe" if coffee/casual focused
- overall_vibe: Capture the mood, lighting, energy level, and general atmosphere in one sentence`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this venue image and provide the vibe analysis in the specified JSON format."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            }
          ]
        }
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response content from OpenAI');
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const analysis = JSON.parse(jsonMatch[0]) as VibeAnalysis;
    
    // Validate the analysis structure
    if (
      typeof analysis.crowded !== 'number' ||
      typeof analysis.business_type !== 'string' ||
      typeof analysis.overall_vibe !== 'string' ||
      !['bar', 'restaurant', 'cafe'].includes(analysis.business_type)
    ) {
      throw new Error('Invalid analysis structure from OpenAI');
    }

    return analysis;
  } catch (error) {
    console.error('Error analyzing vibe:', error);
    throw new Error('Failed to analyze venue vibe');
  }
} 