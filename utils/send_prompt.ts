import OpenAI from "https://deno.land/x/openai@v4.47.1/mod.ts";


export async function sendPrompt(prompt: string, model: string, id: string): Promise<string> {
    const RUNPOD_API_KEY = Deno.env.get("RUNPOD_API_KEY") as string;

    const client = new OpenAI({
        apiKey: RUNPOD_API_KEY,
        baseURL: `https://api.runpod.ai/v2/${id}/openai/v1`,
    });

    console.log("sending prompt:\n", prompt, model, id, `https://api.runpod.ai/v2/${id}/openai/v1\n`);

    const chat = [] //["mistralai/Mixtral-8x7B-v0.1", "nomic-ai/gpt4all-j"];



    if(model in chat) {
      const completion = await client.chat.completions.create({
          model: model,
          messages: [{
              "role": "user",
              "content": prompt,
          }],
          temperature: 0,
          max_tokens: 500,
          stream:true,
      });
    let response: string = "";
    for await (const chunk of completion){
          // console.log(chunk.choices[0]?.delta?.content || "");
      response+=chunk.choices[0]?.delta?.content || "";
    }
    // console.log("response:\n", response);
    return response;

  } else {
    const completion = await client.completions.create({
      model: model,
      prompt: prompt,
      temperature: 0,
      max_tokens:500,

    });
    // console.log(completion.choices[0].text);
    return completion.choices[0].text;
  }
}
