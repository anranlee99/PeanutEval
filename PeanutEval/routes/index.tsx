import { useSignal } from "@preact/signals";
import CodeBox from "../islands/CodeBox.tsx";
import model_list from "../utils/model_list.ts";
import InputBox from "../islands/Input.tsx";

export default function Home() {
  const dropdown_left = useSignal(0);
  const dropdown_right = useSignal(0);
  const left_res = useSignal("");
  const right_res = useSignal("");
  
  return (
    <div class="px-4 py-8 mx-auto bg-[#10111d]">
      <div class="max-w-screen-md mx-auto flex flex-row justify-between">
        <CodeBox code={dropdown_left} content={left_res} />
        <CodeBox code={dropdown_right} content={right_res} />
      </div>
      <InputBox model_left={dropdown_left} model_right={dropdown_right} />
    </div>
  );
}
