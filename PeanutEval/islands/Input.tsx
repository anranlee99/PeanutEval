import { Button } from "../components/Button.tsx";
import { useSignal } from "@preact/signals";
import {createEndpoint} from "../utils/create_endpoint.ts";


export default function InputBox() {
  const prompt = useSignal("");

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    prompt.value = target.value;
  };
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData();
    console.log("Prompt value:", prompt.value);
    formData.append("prompt", prompt.value);

    // let endpoint = await createEndpoint("baichuan-inc/Baichuan2-13B-Chat");
    // console.log(endpoint);

    try {
      const response = await fetch("/api/compare", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to make network request", error);
    }
  };
  return (
    <div class="p-4 bg-gray-100 rounded-lg shadow-md">
      <pre class="whitespace-pre-wrap">
      <form name="AddConnectionForm" onSubmit={handleSubmit}>
          <div class="flex gap-8 py-6">
            <input name="prompt" onChange={handleInputChange}type="text" value={prompt.value} />
            <Button onClick={handleSubmit} type="submit">Send Request</Button>
          </div>
        </form>
      </pre>
    </div>
  );
}
