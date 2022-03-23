import devStart from "./dev-start.mjs";
import devGenerate from "./dev-generate.mjs";

export default async function dev(options) {
  await devGenerate();
  await devStart(options);
}
