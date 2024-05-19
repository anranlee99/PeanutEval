import { Handlers } from "$fresh/server.ts";
import {sendPrompt} from "../../utils/runpod.ts";
import {createEndpoint} from "../../utils/create_endpoint.ts";
export const handler: Handlers = {
  async POST(request) {
    // Parse the request body as FormData
    const formData = await request.formData();

    
    try {
        // const promptValue = formData.get("prompt") as string;
        // console.log("Prompt value:", promptValue);
        let endpoint = await createEndpoint("meta-llama/Meta-Llama-3-8B-Instruct");
        console.log(endpoint);

    //   const res = await sendPrompt(promptValue);
      return new Response(
        JSON.stringify({ message: "request successful: " + endpoint}),
        {
          status: 200, // OK
        },
      );
    } catch (error) {
      console.error("Error getting result from runpod:", error);

      // Respond with an error message
      return new Response(
        JSON.stringify({ error: "Failed to store move data" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500, // Internal Server Error
        },
      );
    }
  },
};
