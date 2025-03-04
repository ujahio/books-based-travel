import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async function () {
  while (true) {
    const userMessage: string = await new Promise((resolve) => {
      rl.question('Say something: ', resolve);
    });

    console.log('user questions:', userMessage);
    // await runAgent({ userMessage })
  }
})();
