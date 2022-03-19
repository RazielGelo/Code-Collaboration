const { platform } = require('process');
const { spawn } = require('child_process');

const isWin = process.platform === "win32";

let cmd = 'npm';
if (isWin) {
    cmd = 'npm.cmd';
}

const development = spawn(cmd, ['run', 'dev']);
const sass = spawn(cmd, ['run', 'sass:watch']);

sass.on('exit',
    (code, signal) => {
        console.log('child process exited with ' +
                `code ${ code } and signal ${ signal }`);
    }
);

sass.stdout.on('data',
    (data) => {
        console.log(`child stdout:\n${ data }`);
    }
);

sass.stderr.on('data',
    (data) => {
    console.error(`child stderr:\n${ data }`);
    }
);

development.on('exit',
    (code, signal) => {
        console.log('child process exited with ' +
                `code ${ code } and signal ${ signal }`);
    }
);

development.stdout.on('data',
    (data) => {
        console.log(`child stdout:\n${ data }`);
    }
);
      
development.stderr.on('data',
    (data) => {
        console.error(`child stderr:\n${ data }`);
    }
);