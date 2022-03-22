import { execa } from 'execa';
import chalk from 'chalk';

export default async function devStart() {
    try {
        console.log(chalk.green('Running command `docker-compose -f ./.dev/docker-compose.yml up --build`'));
        await execa('docker-compose', ['-f',  './.dev/docker-compose.yml',  'up', '--force-recreate']).stdout.pipe(process.stdout);
    } catch (e) {
        console.error(e);
    }
}