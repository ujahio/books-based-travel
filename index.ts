import readline from 'readline';
import { runAgent } from './src/agent';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async function () {
  while (true) {
    const userMessage: string = await new Promise((resolve) => {
      rl.question('Say something: ', resolve);
    });

    await runAgent({ userMessage });
  }
})();
