import { h } from "preact";

interface CodeBoxProps {
  code: string;
}

export default function CodeBox({ code }: CodeBoxProps) {
  return (
    <div class="p-4 bg-gray-100 rounded-lg shadow-md">
      <pre class="whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    </div>
  );
}