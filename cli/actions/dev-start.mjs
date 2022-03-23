import { execa } from 'execa';
import chalk from 'chalk';

export default async function devStart({ build }) {
    try {
        const args = ['-f',  './.dev/docker-compose.yml',  'up', '--force-recreate'];
        if(build) {
            args.push('--build');
        }
        console.log("docker-compose " + args.join(" "));
        await execa('docker-compose', args).stdout.pipe(process.stdout);
    } catch (e) {
        console.error(e);
    }
}