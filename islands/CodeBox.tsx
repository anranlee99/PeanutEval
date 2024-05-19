import modelList from "../utils/model_list.ts";
import { Signal } from "@preact/signals";

interface CodeBoxProps {
  code: Signal<number>;
  content: Signal<string>;
}

export default function CodeBox({ code, content }: CodeBoxProps) {
  const handleDropdownChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    code.value = parseInt(target.value, 10);
  };

  return (
    <div class="z-0 mx-2 ">
      <select class="w-40 mb-2 p-2 bg-[#1f2138] text-[#c8c1dc] rounded focus:outline-none" value={code.value} onChange={handleDropdownChange}>
        {modelList.map((model, index) => (
          <option key={index} value={index}>
            {model}
          </option>
        ))}
      </select>
        <textarea readonly class="z-0 w-full h-64 p-3 bg-[#212239] text-[#c8c1dc] rounded focus:outline-none" value={content}></textarea>

          <code>{content.value}</code>
    </div>
  );
}
