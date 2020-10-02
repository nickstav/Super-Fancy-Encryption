const { spawn } = require("child_process");

let password = "MattIsABum";
let message = "I'm Woody. Howdy howdy howdy.";
let result;

runEncryption();


function runEncryption() {
    // spawn new child process to call the python script
    const python = spawn('python3', ['../python/encode.py', password, message]);
    // collect data from script
    python.stdout.on('data', collectInfo);
    // the 'close' event is emitted when the stdio streams of a child process have been closed. 
    python.on('close', confirmClosed);
    // catch errors
    python.stderr.on('data', handleError);
}

function collectInfo(data) {
    console.log('Piping data from Python script ...');
    let receivedInfo = [];
    receivedInfo.push(data);
    result = JSON.parse(receivedInfo);
    console.log(result);
}

function confirmClosed(code) {
    console.log(`Child process closed with code ${code}`);
}

function handleError(data) {
    console.log(uint8arrayToString(data));
}

function uint8arrayToString(data) {
    return String.fromCharCode.apply(null, data);
};