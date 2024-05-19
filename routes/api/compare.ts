import { Handlers } from "$fresh/server.ts";
import { sendPrompt } from "../../utils/send_prompt.ts";
import { getRandomPrompt } from "../../utils/prompt_list.ts";
import { createEndpoint } from "../../utils/create_endpoint.ts";

export const handler: Handlers = {
  async POST(request: Request): Promise<Response> {
    // Parse the request body as FormData
    const formData = await request.formData();

    const model_left = formData.get("model_left") as string;
    const model_right = formData.get("model_right") as string;

    const id_left = await getCurrentServerlessInstances(model_left);
    const id_right = await getCurrentServerlessInstances(model_right);

    const [prompt , prompt_number, prompts] = getRandomPrompt();


    const num_arguments = 10;
    let args: string[][]= [[],[],[]];
    for(let i=0;i<num_arguments;i++){
      args[0].push("('" + generateParens() + "')");
      args[1].push("('" + generateStrings() + "')");
      args[2].push("('" + generateMatrix() + "')");
    }

    console.log("before responses\n");
    console.log(prompts[mod(prompt_number+1,3)]);
    console.log(prompts[mod(prompt_number-1,3)]);



    const response_left = await sendPrompt(prompt, model_left, id_left);
    const response_left2 = await sendPrompt(prompts[mod(prompt_number+1,3)][0], model_left, id_left);
    const response_left3 = await sendPrompt(prompts[mod(prompt_number-1,3)][0], model_left, id_left);
    console.log("After left\n");
    const response_right = await sendPrompt(prompt, model_right, id_right);
    const response_right2 = await sendPrompt(prompts[mod(prompt_number+1,3)][0], model_right, id_right);
    const response_right3 = await sendPrompt(prompts[mod(prompt_number-1,3)][0], model_right, id_right);
    console.log("After right\n")

    let data_left = await fetch("https://api.runpod.ai/v2/c2sgjxin2sf92f/run?api_key=" + Deno.env.get("RUNPOD_API_KEY"),
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
          "Input" : {
             "num_params" : num_arguments,
              "code" : [response_left, response_left2, response_left3],
              "params" : args,
          }
        })
    });

    console.log(JSON.stringify(data_left));


    let data_right = await fetch("https://api.runpod.ai/v2/c2sgjxin2sf92f/run?api_key=" + Deno.env.get("RUNPOD_API_KEY"),
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
          "Input" : {
             "num_params" : num_arguments,
              "code" : [response_right, response_right2, response_right3],
              "params" : args,
          }
        })
    });
    console.log(JSON.stringify(data_right));

    console.log("responses", response_left, response_right);
    const fd = new FormData();
    fd.set("response_left", response_left);
    fd.set("data_left", data_left);
    fd.set("response_right", response_right);
    fd.set("data_right", data_right);
    fd.set("prompt",prompt);

      return new Response(
        fd,
        {
          status: 200, // OK
        }
      );
  },
};


function mod(n: number, m: number): number{
  return ((n % m) + m) % m;
}

function generateParens(): string{
    let s = "";
  for(let i=0;i<(Math.floor(Math.random() * 20)) + 1;i++){
    const r = Math.random();
    if(r < 1/6.0){
      s +="("
    } else if (r < 2/6.0){
      s += ")"
    } else if (r < 3/6.0){
      s += "["
    } else if (r < 4/6.0) {
      s += "]"
    } else if (r < 5/6.0) {
      s += "{"
    } else {
      s += "}"
    }
  }
  return s;
}

function generateStrings(): string {
  const alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let s = "";
  const len = Math.floor(Math.random() * 20) + 1;
  for(let i=0;i<len;i++){
    s+= alph.charAt(Math.floor(Math.random()*alph.length));
  }

  return s
}

function generateMatrix(): string {
    const rows = Math.floor(Math.random() * 10) + 1;
    const cols = Math.floor(Math.random() * 10) + 1;
    const matrix = [];

    // Populate the matrix with random integers between 0 and 99
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Math.floor(Math.random() * 100));
        }

        matrix.push(row);
    }

    // Create a string representation of the matrix
    const matrixString = matrix.map(row => row.join(' ')).join('\n');
    
    return matrixString;
}


async function getCurrentServerlessInstances(model: string) {
  const response: Response = await fetch("https://api.runpod.io/graphql?api_key=" + Deno.env.get("RUNPOD_API_KEY"), {
    "headers": {
      "content-type": "application/json",
    },
    "referrer": "https://www.runpod.io/",
    "body": "{\"operationName\":\"getEndpoints\",\"variables\":{},\"query\":\"query getEndpoints {\\n  myself {\\n    id\\n    serverlessDiscount {\\n      discountFactor\\n      type\\n      expirationDate\\n      __typename\\n    }\\n    endpoints {\\n      aiKey\\n      gpuIds\\n      allowedCudaVersions\\n      id\\n      idleTimeout\\n      locations\\n      name\\n      networkVolumeId\\n      pods {\\n        desiredStatus\\n        __typename\\n      }\\n      scalerType\\n      scalerValue\\n      templateId\\n      userId\\n      workersMax\\n      workersMin\\n      gpuCount\\n      instanceIds\\n      computeType\\n      template {\\n        containerDiskInGb\\n        containerRegistryAuthId\\n        dockerArgs\\n        env {\\n          key\\n          value\\n          __typename\\n        }\\n        imageName\\n        boundEndpointId\\n        __typename\\n      }\\n      executionTimeoutMs\\n      __typename\\n    }\\n    __typename\\n  }\\n}\"}",
    "method": "POST",
  });
  const res = await response.json();
  const deployed = res.data.myself.endpoints.filter((endpoint: any) => endpoint.name === model);
  if (deployed.length > 0) {
    return deployed[0].id;
  } else {
    await createEndpoint(model);
  }
  return await getCurrentServerlessInstances(model);

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
