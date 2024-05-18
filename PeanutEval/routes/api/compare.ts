import { FreshContext } from "$fresh/server.ts";

//
export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const body = "Hello, world!";
  return new Response(body);
};
