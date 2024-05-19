import { Button } from "../components/Button.tsx";
import { Signal, useSignal } from "@preact/signals";
import model_list from "../utils/model_list.ts";
interface InputBoxProps {
  model_left: Signal<number>;
  model_right: Signal<number>;
  left_res: Signal<string>;
  right_res: Signal<string>;
  onclicktrigger: Signal<number>
  result: Signal<string>;
}
export default function InputBox({ model_left, model_right, left_res, right_res, onclicktrigger, result}: InputBoxProps) {
  const handleSubmit = async (e: Event) => {
    left_res.value = "";
    right_res.value = "";
    e.preventDefault();
    const formData = new FormData();
    formData.append("model_left", model_list[model_left.value]);
    formData.append("model_right", model_list[model_right.value]);
    onclicktrigger.value+=1;

      const response : Response = await fetch("/api/compare", {
        method: "POST",
        body: formData,
      });


      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    const fd = await response.formData();

    left_res.value = (fd.get("response_left") as string).substring(1).replace("Answer:", "").replace("Solution:", "").replace("/(^print\(.+)/gm", "");
    right_res.value = (fd.get("response_right") as string).substring(1).replace("Answer:", "").replace("Solution:", "").replace("/(^print\(.+)/gm", "");

    result.value = JSON.stringify(fd.get("data_left")) + "\n" + JSON.stringify(fd.get("data_right"));

    model_left.value-=1;

    //after the llm grades the result we'd set

    // result.value = ;

  };
  return (
    <Button
      class="text-[#c8c1dc] rounded-lg font-bold shadow-lg hover:text-black my-4 "
      onClick={handleSubmit}
      type="submit"
    >
      Compare
    </Button>
  );
}
