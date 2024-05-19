import { Handlers } from "$fresh/server.ts";
import {sendPrompt} from "../../utils/runpod.ts";

export const handler: Handlers = {
  async POST(request) {
    // Parse the request body as FormData
    const formData = await request.formData();

    
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
