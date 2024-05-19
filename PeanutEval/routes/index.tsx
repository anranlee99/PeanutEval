import { useSignal } from "@preact/signals";
import CodeBox from "../islands/CodeBox.tsx";
import {Button} from "../components/Button.tsx";
import model_list from "../utils/model_list.ts";

export default function Home() {
  const dropdown_left = useSignal(0);
  const dropdown_right = useSignal(0);
  const left_res = useSignal("");
  const right_res = useSignal("");
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("model_left", model_list[dropdown_left.value]);
    formData.append("model_right", model_list[dropdown_right.value]);
    //fetch the model output
    //set left/right res to the output
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
    <div class="px-4 py-8 mx-auto bg-[#10111d]">
      <div class="max-w-screen-md mx-auto flex flex-row justify-between">
        <CodeBox code={dropdown_left} content={left_res} />
        <CodeBox code={dropdown_right} content={right_res} />
      </div>
      < Button class="self-center" onClick={handleSubmit} type="submit">Send Request</Button>
    </div>
  );
}
