import { useSignal } from "@preact/signals";
import CodeBox from "../islands/CodeBox.tsx";
import InputBox from "../islands/Input.tsx";

export default function Home() {
  const dropdown_left = useSignal(0);
  const dropdown_right = useSignal(0);
  const left_res = useSignal("");
  const right_res = useSignal("");
  
  return (
    <div class="px-4 mx-auto bg-[#362c4d] min-h-screen flex flex-col items-center justify-center">
      <h1 class="text-center text-4xl font-bold mb-10 uppercase tracking-wide text-[#54b5ff]">
        PeanutEval
      </h1>
      <h2 class="text-center text-[#7cc2f7] font-bold align-baseline pb-8">Compare your favorite models on codegen performance</h2>
      <div class="flex justify-between w-full max-w-screen-lg">
        <CodeBox code={dropdown_left} content={left_res} />
        <CodeBox code={dropdown_right} content={right_res} />
      </div>
      <InputBox model_left={dropdown_left} model_right={dropdown_right} />

      <div id="result" class="max-w-xl mt-8 p-8 bg-gray-900 rounded-lg shadow-lg hidden">
        <h2 class="text-center text-2xl font-bold mb-4 uppercase tracking-wide text-[#ff6b6b]">Comparison Result</h2>
        <p class="text-white">Comparison results will be displayed here.</p>
      </div>
    </div>
  );
}
