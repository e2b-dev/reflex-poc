"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { bbedit } from "@uiw/codemirror-theme-bbedit";
import sampleCode from "./sample-code";
import { createSandbox } from "./sandbox";

export default function Home() {
  const [code, setCode] = useState(sampleCode);
  const [sandboxUrl, setSandboxUrl] = useState<string | null>(null);

  async function deployCode() {
    setSandboxUrl(null);
    const sandbox = await createSandbox(code);
    setSandboxUrl(sandbox.url);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-[800px] w-full">
        <h1 className="text-2xl font-bold justify-start">Reflex Demo</h1>
        <p className="mt-2 text-gray-500 text-sm mb-4">
          Made with ❤️ by the team at E2B
        </p>
        <CodeMirror
          height="400px"
          extensions={[python()]}
          value={code}
          onChange={(value) => setCode(value)}
          theme={bbedit}
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
          }}
        />
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded-md w-full"
          onClick={deployCode}
        >
          Deploy
        </button>
        {sandboxUrl && (
          <p className="mt-4 text-gray-500 text-sm">
            ✅ Sandbox URL:{" "}
            <a href={sandboxUrl} target="_blank" rel="noopener noreferrer">
              {sandboxUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
