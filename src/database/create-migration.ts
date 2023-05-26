const { exec: execCreate } = require('child_process');

execCreate(
  'npx typeorm migration:create ./src/database/migrations/' + process.argv.slice(2),
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  },
);
