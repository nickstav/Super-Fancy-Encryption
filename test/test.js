const { spawn } = require("child_process");

let password = "MattIsABum";
let message = "I'm Woody. Howdy howdy howdy.";

// spawn new child process to call the python script
const python = spawn('python', ['test.py', password, message]);

// collect data from script
python.stdout.on('data', collectInfo);

//The 'close' event is emitted when the stdio streams of a child process have been closed. 
python.on('close', confirmClosed);



function collectInfo(data) {
    console.log('Piping data from Python script ...');
    let receivedInfo = []
    receivedInfo.push(data);
    console.log(JSON.parse(receivedInfo));
}

function confirmClosed(code) {
    console.log(`Child process closed with code ${code}`);
}