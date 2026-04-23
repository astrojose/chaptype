declare module 'react-dom/server.browser' {
  import type { ReactNode } from 'react';

  export * from 'react-dom/server';

  export function renderToReadableStream(
    children: ReactNode,
    options?: {
      identifierPrefix?: string;
      namespaceURI?: string;
      nonce?: string;
      bootstrapScriptContent?: string;
      bootstrapScripts?: string[];
      bootstrapModules?: string[];
      progressiveChunkSize?: number;
      signal?: AbortSignal;
      onError?: (error: unknown) => void;
      onAllReady?: () => void;
      onShellReady?: () => void;
      onShellError?: (error: unknown) => void;
    },
  ): Promise<ReadableStream>;
}
