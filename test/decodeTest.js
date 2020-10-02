const { spawn } = require("child_process");

let password = "MattIsABum";
let message = [194, 165, 194, 175, 195, 130, 93, 195, 152, 194, 178, 195, 158, 195, 171, 194, 157, 194, 150, 194, 149, 194, 158, 195, 157, 195, 141, 194, 179, 195, 149, 194, 168, 194, 189, 194, 172, 195, 184, 194, 167, 195, 168, 194, 167, 194, 140, 195, 151, 195, 172, 194, 186, 195, 167, 194, 132];

runDecoding();

function runDecoding() {
    const python = spawn('python3', ['./decodeTest.py', password, message.toString()]);
    python.stdout.on('data', (decodeMessage));
    python.on('close', confirmClosed);
    python.stderr.on('data', handleError);
}

function decodeMessage(data) {
    console.log('Decoding message...');
    let receivedInfo = [];
    receivedInfo.push(data);
    let result = JSON.parse(receivedInfo);
    console.log(result);
}

function confirmClosed(code) {
    if (code === 0) {
        console.log(`Child process closed with code ${code}`);
    } else {
        console.log('Error: Process could not be completed');
    }
}

function handleError(data) {
    console.log(uint8arrayToString(data));
}

function uint8arrayToString(data) {
    return String.fromCharCode.apply(null, data);
};