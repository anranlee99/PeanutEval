import { useSignal } from "@preact/signals";
import CodeBox from "../islands/CodeBox.tsx";
import InputBox from "../islands/Input.tsx";

export default function Home() {
  const trigger = useSignal(0);
  const dropdown_left = useSignal(0);
  const dropdown_right = useSignal(0);
  const left_res = useSignal("");
  const right_res = useSignal("");
  const result = useSignal("");

  return (
    <div class="px-4 mx-auto bg-[#201E2B] min-h-screen flex flex-col items-center justify-center">
      <h1 class="mx-4 text-lg font-sixty mb-2 tracking-wide text-[#c8c1dc]">
        PeanutEval
      </h1>
      <h2 class="mx-4 mb-4 text-left text-xs text-[#c8c1dc] font-Comfortaa align-baseline ">
        Compare your favorite models on codegen performance
      </h2> 
      <InputBox model_left={dropdown_left} model_right={dropdown_right} left_res={left_res} right_res={right_res} onclicktrigger={trigger} result={result}/>
      <div class="font-sixty flex justify-between w-full max-w-screen-lg">
        <CodeBox code={dropdown_left} content={left_res} onclicktrigger={trigger}/>
        <CodeBox code={dropdown_right} content={right_res} onclicktrigger={trigger}/>
      </div>

      {result.value ? <div
        id="result"
        class="min-w-screen flex flex-col max-w-xl p-8 bg-[#262E48] rounded-lg shadow-lg "
      >
        <h2 class="text-center mb-4 tracking-wide text-[#c8c1dc]">
          Comparison Result
        </h2>
        <textarea readonly class=" self-center justify-center z-0 w-96 h-64 p-3 bg-[#212239] text-[#c8c1dc] text-sm rounded focus:outline-none overflow-auto" value={result.value}>
      </textarea>
      </div> : null}
    </div>
  );
}
