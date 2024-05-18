import { useSignal } from "@preact/signals";
import CodeBox from "../islands/CodeBox.tsx";
export default function Home() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#10111d]">
      <div class="max-w-screen-md mx-auto flex flex-row items-center justify-between">
        <CodeBox code={`const count = useSignal(${count})`} />
        <CodeBox code={`const count = useSignal(${count})`} />
      </div>
    </div>
  );
}
