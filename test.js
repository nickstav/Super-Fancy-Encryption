//Main function that calls the python process, and returns the cleaned, processed output of encode.py
async function main() {
    let test = await runPythonSFE('nick', 'oh hello you silly goose', 'python/encode.py')
    console.log(test);
}

//Function that creates the python process (passing in the script name + args), and adds pipes/onClose handling
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

//Function that runs when the python process is eventually closed
function confirmClosed(code) {
    if (code === 0) {
        console.log(`Child process closed with code ${code}`);
    } else {
        console.log('Error: Process could not be completed');
    }
}

//Function that runs when the python process throws an error
function handleError(data) {
    console.log(uint8arrayToString(data));
}

//Helper function that takes a UInt8 result and converts to a string
function uint8arrayToString(data) {
    return String.fromCharCode.apply(null, data);
};

//Run the main function
main();