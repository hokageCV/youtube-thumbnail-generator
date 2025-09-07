import { GoogleGenAI } from "@google/genai";

const nanoBanana = new GoogleGenAI({
  apiKey: process.env.NANO_BANANA_KEY,
})

export async function generateImage(
  processedText: string,
  base64Image?: string
): Promise<{ text: string; imageUrl: string | null }> {
  const contentArray: any[] = [{ text: processedText }]

  if (base64Image) {
    const mimeTypeMatch = base64Image.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'image/jpeg';
    base64Image = base64Image.replace(/^data:image\/\w+;base64,/, '')

    contentArray.push({ inlineData: { mimeType: mimeType, data: base64Image } })
  }

  try {
    const completion = await nanoBanana.models.generateContent({
      model: process.env.IMAGE_MODEL_NAME!,
      contents: contentArray,
    })

    let text = '';
    let imageUrl: string | null = null;

    const parts = completion.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.text) {
        text += part.text + ' ';
      } else if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    return { text: text.trim(), imageUrl: imageUrl }
  }
  catch (err: any) {

    if (err.response?.data) {
      console.log('Error status:', err.response.status);
      console.log('Error code:', err.response.data.error?.code);
      console.log('Error message:', err.response.data.error?.message);
      console.log('Error status:', err.response.data.error?.status);
    } else if (err.message) {
      console.log('Error message:', err.message);
    } else {
      console.log('Error:', JSON.stringify(err, null, 2));
    }

    throw err;
  }

}
