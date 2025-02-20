/**
 * Cloudflare Workers entry server implementation using web streams
 * See https://remix.run/docs/en/main/guides/cloudflare
 */
import type { EntryContext } from "@remix-run/cloudflare";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";

const ABORT_DELAY = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const isBot = isbot(request.headers.get("user-agent") || "");
  const controller = new AbortController();

  const stream = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} data-oid="skrti_i" />,
    {
      signal: AbortSignal.timeout(ABORT_DELAY),
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isBot) {
    await stream.allReady;
  }

  responseHeaders.set("Content-Type", "text/html");
  return new Response(stream, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
