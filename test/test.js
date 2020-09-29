const { spawn } = require("child_process");

let password = "MattIsABum";
let message = "I'm Woody. Howdy howdy howdy.";
let receivedInfo = [];
let encodedMessage;


// spawn new child process to call the python script
const python = spawn('python', ['test.py', password, message]);

// collect data from script
python.stdout.on('data', collectInfo);

//The 'close' event is emitted when the stdio streams of a child process have been closed. 
python.on('close', confirmClosed);



function collectInfo(data) {
    console.log('Piping data from Python script ...');
    receivedInfo.push(data);
}

function confirmClosed(code) {
    let result = JSON.parse(receivedInfo);
    console.log(result);
    console.log(`Child process closed with code ${code}`);
}