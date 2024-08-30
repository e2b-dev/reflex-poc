"use client";

import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { bbedit } from "@uiw/codemirror-theme-bbedit";
import sampleCode from "./sample-code";
import { createSandbox, updateSandbox } from "./sandbox";

type Sandbox = {
  id: string;
  url: string;
};

export default function Home() {
  const [code, setCode] = useState(sampleCode);
  const [sandbox, setSandbox] = useState<Sandbox | null>(null);
  const [loading, setLoading] = useState(false);

  async function deployCode() {
    setLoading(true);

    if (sandbox) {
      await updateSandbox(sandbox.id, code);
    } else {
      setSandbox(null);
      const sandbox = await createSandbox(code);
      setSandbox(sandbox);
    }

    setLoading(false);
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
        {sandbox && (
          <p className="mt-4 text-gray-500 text-sm">
            ✅ Sandbox URL:{" "}
            <a href={sandbox.url} target="_blank" rel="noopener noreferrer">
              {sandbox.url}
            </a>
          </p>
        )}
        {loading && (
          <p className="mt-4 text-gray-500 text-sm">Launching sandbox...</p>
        )}
      </div>
    </div>
  );
}
