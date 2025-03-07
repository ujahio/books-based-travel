import readline from 'readline';
import { runAgent } from './src/agent';
import { tools } from './src/tools';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async function () {
  const userMessage: string = await new Promise((resolve) => {
    rl.question('What recommendation do you need: ', resolve);
  });

  await runAgent({ userMessage, tools });
})();
