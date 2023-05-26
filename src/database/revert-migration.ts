const { exec: execRevert } = require('child_process');

execRevert('npx typeorm-ts-node-esm migration:revert -d ./ormconfig.ts', (error, stdout, stderr) => {
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
