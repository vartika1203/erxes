import { execa } from "execa";
import startWatchDotErxes from "./start-watch-doterxes.mjs";

export default async function devStart() {
  try {
    await startWatchDotErxes();
    
    const args = [
      "-f",
      "./.dev/docker-compose.yml",
      "up",
      "--force-recreate",
      "--remove-orphans",
      "--build"
    ];

    console.log("docker-compose " + args.join(" "));

    const cmd = execa("docker-compose", args, { stdio: 'inherit' });

    await cmd;
  } catch (e) {
    console.error(e);
  }
}
