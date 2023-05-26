const { exec: execGenerate } = require('child_process');

execGenerate('npx typeorm-ts-node-esm migration:generate -d ./ormconfig.ts ./src/database/migrations/' + process.argv.slice(2), (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`${stdout}`);
});

