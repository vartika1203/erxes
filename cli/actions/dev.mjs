import devStart from './dev-start.mjs';
import devGenerate from './dev-generate.mjs';

export default async function dev() {
    await devGenerate();
    await devStart();
}