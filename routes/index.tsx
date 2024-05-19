import { useSignal } from "@preact/signals";
import CodeBox from "../islands/CodeBox.tsx";
import InputBox from "../islands/Input.tsx";

export default function Home() {
  const dropdown_left = useSignal(0);
  const dropdown_right = useSignal(0);
  const left_res = useSignal("");
  const right_res = useSignal("");

  return (
    <div class="px-4 mx-auto bg-[#201E2B] min-h-screen flex flex-col justify-center">
      <h1 class="mx-4 text-lg font-sixty mb-2 tracking-wide text-[#c8c1dc]">
        PeanutEval
      </h1>
      <h2 class="mx-4 mb-4 text-left text-xs text-[#c8c1dc] font-Comfortaa align-baseline ">
        Compare your favorite models on codegen performance
      </h2> 
      <div class="z-10 flex justify-end max-w-screen-lg mr-3">
      <InputBox model_left={dropdown_left} model_right={dropdown_right} />
      </div>
      <div class="font-sixty flex justify-between -mt-8 w-full max-w-screen-lg">
        <CodeBox code={dropdown_left} content={left_res} />
        <CodeBox code={dropdown_right} content={right_res} />
      </div>

      <div
        id="result"
        class="max-w-xl p-8 bg-[#262E48] rounded-lg shadow-lg hidden"
      >
        <h2 class="text-center text-2xl font-bold mb-4 uppercase tracking-wide text-[#c8c1dc]">
          Comparison Result
        </h2>
        <p class="text-[#c8c1dc]">Comparison results will be displayed here.</p>
      </div>
    </div>
  );
}
