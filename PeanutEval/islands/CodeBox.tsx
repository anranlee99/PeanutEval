import modelList from "../utils/model_list.ts";
import { Signal } from "@preact/signals";
interface CodeBoxProps {
  code: Signal<number>;
}

export default function CodeBox({ code }: CodeBoxProps) {
  const handleDropdownChange = (event) => {
    code.value = modelList.indexOf(event.target!.value);
  };
  return (
    <>
      <div class="flex flex-col">
        <select value={code} onChange={handleDropdownChange}>
          {modelList.map((model, index) => (
            <option key={index} value={index}>
              {model}
            </option>
          ))}
        </select>
      <div class="p-4 bg-gray-100 rounded-lg shadow-md">
        <pre class="whitespace-pre-wrap">
        <code></code>
        </pre>
      </div>
      </div>
    </>
  );
}
