import OpenAI from "https://deno.land/x/openai@v4.47.1/mod.ts";

export async function sendPrompt(prompt: string) {
  const RUNPOD_API_KEY = Deno.env.get("RUNPOD_API_KEY") as string;
  const ENDPOINT_ID = Deno.env.get("RUN_ENDPOINT_ID") as string;

  const client = new OpenAI({
      apiKey: RUNPOD_API_KEY,
      baseURL: `https://api.runpod.ai/v2/${ENDPOINT_ID}/openai/v1`,
    });

  const completion = await client.chat.completions.create({
    model: "meta-llama/Meta-Llama-3-8B-Instruct" ,
    messages: [{
      "role": "user",
      "content": "Is Chipotle worth the price?",
    }],
    temperature: 0,
    max_tokens: 100,
  });
  console.log(completion)
  return JSON.parse(completion.choices[0].message.content as string);
}
