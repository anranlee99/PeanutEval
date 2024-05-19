import { useSignal } from "@preact/signals";
import CodeBox from "../islands/CodeBox.tsx";
import InputBox from "../islands/Input.tsx";
export default function Home() {
  const dropdown_left = useSignal(0);
  const dropdown_right = useSignal(0);
  return (
    <div class="px-4 py-8 mx-auto bg-[#10111d]">
      <div class="max-w-screen-md mx-auto flex flex-row items-center justify-between">
        <CodeBox code={dropdown_left} />
        <CodeBox code={dropdown_right} />
      </div>

      

      <InputBox />

    </div>
  );
}
