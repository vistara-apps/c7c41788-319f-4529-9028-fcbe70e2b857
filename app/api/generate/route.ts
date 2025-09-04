import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    // Initialize OpenAI client inside the function to avoid build-time issues
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://openrouter.ai/api/v1",
      dangerouslyAllowBrowser: true,
    });
    const { imageUrl, prompt, platforms } = await request.json();

    // Generate ad copy variations
    const copyResponse = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: `You are an expert social media ad copywriter. Create engaging, conversion-focused ad copy for the given platforms: ${platforms.join(', ')}. Each copy should be unique and optimized for the specific platform's audience and format.`
        },
        {
          role: 'user',
          content: `Create 3-5 unique ad copy variations for this product. Additional context: ${prompt}. Make them engaging, include relevant emojis, and optimize for social media engagement.`
        }
      ],
      max_tokens: 800,
      temperature: 0.8
    });

    // Parse the copy variations
    const copyVariations = copyResponse.choices[0].message.content
      ?.split('\n')
      .filter(line => line.trim().length > 0 && !line.includes('Variation') && !line.includes('Copy'))
      .slice(0, 5) || [];

    // Generate image variations (mock implementation)
    const adVariations = copyVariations.map((copy, index) => ({
      id: Date.now() + index,
      imageUrl: imageUrl, // In a real implementation, this would be DALL-E generated variations
      copy: copy.trim(),
      platform: platforms[index % platforms.length],
      metrics: {
        views: Math.floor(Math.random() * 3000) + 500,
        likes: Math.floor(Math.random() * 200) + 20,
        shares: Math.floor(Math.random() * 50) + 5
      }
    }));

    return NextResponse.json({ variations: adVariations });
  } catch (error) {
    console.error('Error generating ads:', error);
    return NextResponse.json(
      { error: 'Failed to generate ad variations' },
      { status: 500 }
    );
  }
}
