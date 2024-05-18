import { Handlers } from "$fresh/server.ts";

//
export const handler: Handlers = {
  async POST(request){
    // Parse the request body as FormData
    const formData = await request.formData();

    try {
      const promptValue = formData.get("prompt") as FormDataEntryValue;

      console.log("Prompt value:", promptValue);
      return new Response(JSON.stringify({ message: "Move data stored successfully" }), {
        status: 200, // OK  
      });
    } catch (error) {
      console.error("Error writing move to deno_kv:", error);

      // Respond with an error message
      return new Response(JSON.stringify({ error: "Failed to store move data" }), {
        headers: { "Content-Type": "application/json" },
        status: 500, // Internal Server Error
      });
    }
  },
};