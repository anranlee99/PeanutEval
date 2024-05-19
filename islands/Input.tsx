import { Button } from "../components/Button.tsx";
import { Signal, useSignal } from "@preact/signals";
import model_list from "../utils/model_list.ts";
interface InputBoxProps {
  model_left: Signal<number>;
  model_right: Signal<number>;
}
export default function InputBox({ model_left, model_right }: InputBoxProps) {
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("model_left", model_list[model_left.value]);
    formData.append("model_right", model_list[model_right.value]);

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
            <Button class="text-[#c8c1dc] rounded-lg font-bold shadow-lg hover:text-black" onClick={handleSubmit} type="submit">Compare</Button>
  );
}
