import OpenAI from "https://deno.land/x/openai@v4.47.1/mod.ts";


export async function sendPrompt(prompt: string, model: string) {
    const RUNPOD_API_KEY = Deno.env.get("RUNPOD_API_KEY") as string;

    const client = new OpenAI({
        apiKey: RUNPOD_API_KEY,
        baseURL: `https://api.runpod.ai/v2/${model}/openai/v1`,
    });

    const completion = await client.chat.completions.create({
        model: model,
        messages: [{
            "role": "user",
            "content": prompt,
        }],
        temperature: 0,
        max_tokens: 100,
    });
    console.log(completion)
    return JSON.parse(completion.choices[0].message.content as string);
}
