import { Handlers } from "$fresh/server.ts";
import { createEndpoint } from "../../utils/create_endpoint.ts";

export const handler: Handlers = {
  async POST(request) {
    // Parse the request body as FormData
    const formData = await request.formData();
    const model = formData.get("model");
    

    //
    
    try {
      return new Response(
        JSON.stringify({ message: `Successfully created ${model}`}),
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
