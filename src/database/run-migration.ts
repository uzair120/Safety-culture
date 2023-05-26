const { exec: execRun } = require('child_process');

// execRun('ts-node node_modules/typeorm/cli.js migration:run -d ormconfig', (error, stdout, stderr) => {
execRun('npx typeorm-ts-node-esm migration:run -d ./ormconfig.ts', (error, stdout, stderr) => {
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
