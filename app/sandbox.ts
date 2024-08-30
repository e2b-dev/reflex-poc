"use server";
import { Sandbox } from "e2b";

const template = "reflex-e2b-poc";

const filename = "/home/user/e2b/e2b.py";

export async function createSandbox(code: string) {
  // Create sandbox
  const sandbox = await Sandbox.create(template);

  // Copy code to the sandbox
  await sandbox.filesystem.write(filename, code);

  const url = await sandbox.getHostname(3000);

  return {
    url: `https://${url}`,
  };
}
