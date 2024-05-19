export async function createEndpoint(model: string) {
  const reqObj = {
    "operationName": "saveEndpoint",
    "variables": {
      "input": {
        "gpuIds": "AMPERE_80",
        "idleTimeout": 5,
        "locations": null,
        "name": model,
        "networkVolumeId": null,
        "scalerType": "QUEUE_DELAY",
        "scalerValue": 4,
        "workersMax": 3,
        "workersMin": 1,
        "gpuCount": 1,
        "bindEndpoint": true,
        "allowedCudaVersions": "12.1,12.2,12.3",
        "template": {
          "name": model,
          "imageName": "runpod/worker-vllm:stable-cuda12.1.0",
          "containerDiskInGb": 300,
          "dockerArgs": "",
          "env": [
            {
              "key": "MODEL_NAME",
              "value": model,
            },
            {
              "key": "BASE_PATH",
              "value": "/runpod-volume",
            },
            {
              "key": "HF_TOKEN",
              "value": Deno.env.get("HUGGING_FACE_WRITE"),
            },
          ],
        },
      },
    },
    "query":
      "mutation saveEndpoint($input: EndpointInput!) {\n  saveEndpoint(input: $input) {\n    gpuIds\n    id\n    idleTimeout\n    locations\n    name\n    networkVolumeId\n    scalerType\n    scalerValue\n    templateId\n    userId\n    workersMax\n    workersMin\n    gpuCount\n    __typename\n  }\n}",
  };

  const url = "https://api.runpod.io/graphql?api_key=" + Deno.env.get("RUNPOD_API_KEY");

  const response = await fetch(url, {
    "headers": {
      "content-type": "application/json",
    },
    "body": JSON.stringify(reqObj),
    "method": "POST",
  });
  return response;
}
