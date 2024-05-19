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
    <div class="flex flex-col">
      <select value={code.value} onChange={handleDropdownChange}>
        {modelList.map((model, index) => (
          <option key={index} value={index}>
            {model}
          </option>
        ))}
      </select>
      <div class="p-4 bg-gray-100 rounded-lg shadow-md">
        <pre class="whitespace-pre-wrap">
          <code>{content.value}</code>
        </pre>
      </div>
    </div>
  );
}
