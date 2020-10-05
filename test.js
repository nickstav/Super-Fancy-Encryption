testIt();

async function testIt() {
    let test = await runPythonSFE('nick', 'oh hello you silly goose', 'python/encode.py')
    console.log(test);
}

async function runPythonSFE(password, message, filePath) {
    console.log('Piping data from Python script ...');

	let result = await new Promise(resolve => {
        const { spawn } = require("child_process");
        // spawn new child process to call the python script using an absolute path
		const python = spawn('python3', [filePath, password, message]);
		// collect data from script
		python.stdout.on('data', resolve);
		// the 'close' event is emitted when the stdio streams of a child process have been closed. 
		python.on('close', confirmClosed);
		// catch errors
		python.stderr.on('data', handleError);
    });
    
    // the above returns a buffer object which we convert to a string
    let bufferAsString = result.toString();
    //get the JSON section of string by searching for the opening bracket & taking the string from there
    let returnedData = "{" + bufferAsString.split('{')[1];

    return JSON.parse(returnedData);
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