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
    <div class="w-1/2 p-8 bg-gray-900 rounded-lg mx-2 shadow-lg transform transition-transform hover:-translate-y-1">
      <select class="w-full p-2 mb-2 bg-gray-800 text-pink-500 rounded focus:outline-none" value={code.value} onChange={handleDropdownChange}>
        {modelList.map((model, index) => (
          <option key={index} value={index}>
            {model}
          </option>
        ))}
      </select>
        <textarea class="w-full h-64 p-3 bg-gray-800 text-white rounded focus:outline-none" value={content}></textarea>

          <code>{content.value}</code>
    </div>
  );
}
