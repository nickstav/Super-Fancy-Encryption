showThing();

async function showThing() {
    let thing = await runMattsEncryption('nick', 'och helloooooo there!');
    console.log(thing);
}

async function runEncryption(password, message) {
    const { spawn } = require("child_process");
    let result;
    // spawn new child process to call the python script
    const python = spawn('python3', ['../python/encode.py', password, message]);
    // collect data from script
    python.stdout.on('data', collectInfo);
    // the 'close' event is emitted when the stdio streams of a child process have been closed. 
    python.on('close', confirmClosed);
    // catch errors
    python.stderr.on('data', handleError);
    
    await new Promise(resolve => python.on('close', resolve));
    
    return result;
}

async function runMattsEncryption(password, message) {
	return new Promise(resolve => {
        const { spawn } = require("child_process");
		// spawn new child process to call the python script
		const python = spawn('python3', ['../python/encode.py', password, message]);
		// collect data from script
		python.stdout.on('data', collectInfo);
		// the 'close' event is emitted when the stdio streams of a child process have been closed. 
		python.on('close', resolve);
		// catch errors
		python.stderr.on('data', handleError);
	});
}

function collectInfo(data) {
    console.log('Piping data from Python script ...');
    let receivedInfo = [];
    receivedInfo.push(data);
    result = JSON.parse(receivedInfo);
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

module.exports = { runEncryption }