const { spawn } = require("child_process");

// spawn new child process to call the python script
const python = spawn('python', ['example.py']);

// collect data from script
python.stdout.on('data', collectInfo);

//The 'close' event is emitted when the stdio streams of a child process have been closed. 
python.on('close', confirmClosed);



function collectInfo(data) {
    console.log('Piping data from Python script ...');
    let receivedInfo = data.toString();
    console.log(receivedInfo);
}

function confirmClosed(code) {
    console.log(`Child process closed with code ${code}`);
}