"use server";
import { Sandbox } from "e2b";

const template = "reflex-e2b-poc";

const filename = "/home/user/e2b/e2b.py";

export async function createSandbox(code: string) {
  // Create sandbox
  const sandbox = await Sandbox.create(template);

  // Copy the code to the sandbox
  await sandbox.filesystem.write(filename, code);

  // Start the dev server
  await sandbox.process.start("cd /home/user && reflex run");

  // Get the server URL
  const url = await sandbox.getHostname(3000);

  // Run the healthcheck - will start and wait for the dev server to be ready
  await sandbox.process.startAndWait("python3 /home/user/healthcheck.py " + url);

  // Run healthcheck again to make sure the server is fully reloaded
  // await sandbox.process.startAndWait("python3 /home/user/healthcheck.py " + url);

  // Return the URL
  return {
    url: `https://${url}`,
  };
}
