import { execa } from 'execa';
import chalk from 'chalk';

export default async function devStart({ build }) {
    try {
        const args = ['-f',  './.dev/docker-compose.yml',  'up', '--force-recreate', '--remove-orphans'];
        if(build) {
            args.push('--build');
        }
        console.log("docker-compose " + args.join(" "));

        const cmd  = execa('docker-compose', args);
        cmd.stdout.pipe(process.stdout);
        cmd.stderr.pipe(process.stderr);

        await cmd;
    } catch (e) {
        console.error(e);
    }
}