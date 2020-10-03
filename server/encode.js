async function runEncryption(password, message) {
    
    console.log('Piping data from Python script ...');

	let result = await new Promise(resolve => {
        const { spawn } = require("child_process");
		// spawn new child process to call the python script
		const python = spawn('python3', ['../python/encode.py', password, message]);
		// collect data from script
		python.stdout.on('data', resolve);
		// the 'close' event is emitted when the stdio streams of a child process have been closed. 
		python.on('close', confirmClosed);
		// catch errors
		python.stderr.on('data', handleError);
    });
    
    return JSON.parse([result]);
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

/*
async function runEncryption(password, message) {
    const { spawn } = require("child_process");
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
*/

/*
function collectInfo(data) {
    console.log('Piping data from Python script ...');
    result = JSON.parse([data]);
}
*/