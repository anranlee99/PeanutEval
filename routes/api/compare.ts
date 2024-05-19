import { Handlers } from "$fresh/server.ts";
import { sendPrompt } from "../../utils/send_prompt.ts";
import { getRandomPrompt } from "../../utils/prompt_list.ts";

export const handler: Handlers = {
  async POST(request: Request): Promise<Response> {
    // Parse the request body as FormData
    const formData = await request.formData();

    const model_left = formData.get("model_left") as string;
    const model_right = formData.get("model_right") as string;
    console.log(model_left, model_right);

    const resp = await getCurrentServerlessInstances();

    for (const dict of resp.data.myself.endpoints) {
      if (!dict.name.includes(model_left)) {
        const fd = new FormData();
        fd.set("model", model_left);
        await fetch("/api/create", {
          method: "POST",
          body: fd,
          headers: {
            "Content-Type": "application/json",
          },
        })
      }
      if (!dict.name.includes(model_right)) {
        const fd = new FormData();
        await fetch("/api/create", {
          method: "POST",
          body: fd,
          headers: {
            "Content-Type": "application/json",
          },
        })
      }
    };
    const prompt = getRandomPrompt();
    const response_left = await sendPrompt(prompt, model_left);
    const response_right = await sendPrompt(prompt, model_right);
    const fd = new FormData();
    fd.set("response_left", response_left);
    fd.set("response_right", response_right);
    try {

      return new Response(
        fd,
        {
          status: 200, // OK
        }
      );
    } catch (error) {
      console.error("Error getting result from runpod:", error);

      // Respond with an error message
      return new Response(
        JSON.stringify({ error: "Failed to query prompt" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500, // Internal Server Error
        },
      );
    }
  },
};

async function getCurrentServerlessInstances() {
  const response: Response = await fetch("https://api.runpod.io/graphql?api_key=" + Deno.env.get("RUNPOD_API_KEY"), {
    "headers": {
      "content-type": "application/json",
    },
    "referrer": "https://www.runpod.io/",
    "body": "{\"operationName\":\"getEndpoints\",\"variables\":{},\"query\":\"query getEndpoints {\\n  myself {\\n    id\\n    serverlessDiscount {\\n      discountFactor\\n      type\\n      expirationDate\\n      __typename\\n    }\\n    endpoints {\\n      aiKey\\n      gpuIds\\n      allowedCudaVersions\\n      id\\n      idleTimeout\\n      locations\\n      name\\n      networkVolumeId\\n      pods {\\n        desiredStatus\\n        __typename\\n      }\\n      scalerType\\n      scalerValue\\n      templateId\\n      userId\\n      workersMax\\n      workersMin\\n      gpuCount\\n      instanceIds\\n      computeType\\n      template {\\n        containerDiskInGb\\n        containerRegistryAuthId\\n        dockerArgs\\n        env {\\n          key\\n          value\\n          __typename\\n        }\\n        imageName\\n        boundEndpointId\\n        __typename\\n      }\\n      executionTimeoutMs\\n      __typename\\n    }\\n    __typename\\n  }\\n}\"}",
    "method": "POST",
  });
  return response.json();
}

async function deleteServerlessInstance(id: string) {
  const response = await fetch("https://api.runpod.io/graphql" + Deno.env.get("RUNPOD_API_KEY"), {
    "headers": {
      "content-type": "application/json",
      "Sec-GPC": "1"
    },
    "referrer": "https://www.runpod.io/",
    "body": JSON.stringify({ "operationName": "deleteEndpoint", "variables": { "id": id }, "query": "mutation deleteEndpoint($id: String!) {\n  deleteEndpoint(id: $id)\n}" }),
    "method": "POST",
  });

  if (response.status != 200) {
    console.log("Error deleting Instance");
  }
}
