import { execa } from 'execa';

export default async function devStart() {
    try {
        await execa('docker-compose', ['-f',  './.dev/docker-compose.yml',  'up', '--build']).stdout.pipe(process.stdout);
    } catch (e) {
        console.error(e);
    }
}