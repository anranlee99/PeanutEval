import { Handlers } from "$fresh/server.ts";
import {sendPrompt} from "../../utils/runpod.ts";

export const handler: Handlers = {
  async POST(request: Request) {
    // Parse the request body as FormData
    console.log("hi!");
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

async function getCurrentServerlessInstances(){
  const response: Response = await fetch("https://api.runpod.io/graphql" + Deno.env.get("RUNPOD_API_KEY"), {
    "headers": {
        "content-type": "application/json",
    },
    "referrer": "https://www.runpod.io/",
    "body": "{\"operationName\":\"getEndpoints\",\"variables\":{},\"query\":\"query getEndpoints {\\n  myself {\\n    id\\n    serverlessDiscount {\\n      discountFactor\\n      type\\n      expirationDate\\n      __typename\\n    }\\n    endpoints {\\n      aiKey\\n      gpuIds\\n      allowedCudaVersions\\n      id\\n      idleTimeout\\n      locations\\n      name\\n      networkVolumeId\\n      pods {\\n        desiredStatus\\n        __typename\\n      }\\n      scalerType\\n      scalerValue\\n      templateId\\n      userId\\n      workersMax\\n      workersMin\\n      gpuCount\\n      instanceIds\\n      computeType\\n      template {\\n        containerDiskInGb\\n        containerRegistryAuthId\\n        dockerArgs\\n        env {\\n          key\\n          value\\n          __typename\\n        }\\n        imageName\\n        boundEndpointId\\n        __typename\\n      }\\n      executionTimeoutMs\\n      __typename\\n    }\\n    __typename\\n  }\\n}\"}",
    "method": "POST",
});  
  console.log(response);
}
