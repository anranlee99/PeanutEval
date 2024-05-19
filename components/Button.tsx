import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 border-gray-500 border-2 rounded bg-[#5E7DEE] hover:bg-black transition-colors text-[#c8c1dc]"
    />
  );
}
