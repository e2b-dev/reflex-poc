"use server";
import { Sandbox } from "e2b";

const template = "reflex-e2b-poc";
const filename = "/home/user/e2b/e2b.py";
const protocol = "https"; // we only support https
const frontend_port = 3000;
const backend_port = 8000;

export async function createSandbox(code: string) {
  // Create sandbox
  const sandbox = await Sandbox.create(template);

  // Copy the code to the sandbox
  await sandbox.filesystem.write(filename, code);

  // Get backend URL
  const backend_url = await sandbox.getHostname(backend_port);

  // Start the dev server
  await sandbox.process.start(
    `cd /home/user && API_URL=${protocol}://${backend_url} reflex run`
  );

  // Get the frontend URL
  const frontend_url = await sandbox.getHostname(frontend_port);

  // Run the healthcheck - will start and wait for the dev server to be ready
  await sandbox.process.startAndWait(
    "python3 /home/user/healthcheck.py " + frontend_url
  );

  // Return the URL
  return {
    url: `${protocol}://${frontend_url}`,
  };
}
