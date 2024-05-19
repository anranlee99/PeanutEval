import { Handlers } from "$fresh/server.ts";
import {sendPrompt} from "../../utils/runpod.ts";

export const handler: Handlers = {
  async POST(request) {
    // Parse the request body as FormData
    const formData = await request.formData();
    const model_left = formData.get("model_left");
    const model_right = formData.get("model_right");
    //TODO: nma?
    // check if we have a serverless instance running here
    // if yes, then query the prompt 
    // if not, make an api call to /api/create to create a new serverless instance
    // then query the prompt

    //then return the model outputs as a response
    
    try {

      return new Response(
        JSON.stringify({ message: "request successful: " }),
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
