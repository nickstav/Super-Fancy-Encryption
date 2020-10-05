/*

TODOS:

1) make the Promise created in runPythonSFE wait until the python process has closed, before resolving/rejecting
2) use the function passed as callback to python.stdout.on, record the data. Remember that all variables created inside runPythonSFE are available inside runPythonSFE.
3) once the function has definitely closed, validate that the result is as expected, before parsing and returning

*/

//Main function that calls the python process, and returns the cleaned, processed output of encode.py
async function main() {
    let test = await runPythonSFE('nick', 'oh hello you silly goose', 'python/encode.py')
    console.log(JSON.parse(test));
}

//Function that creates the python process (passing in the script name + args), and adds pipes/onClose handling
async function runPythonSFE(password, message, filePath) {
    const { spawn } = require("child_process");
    console.log('Piping data from Python script ...');

    let result = [];

	await new Promise((resolve, reject) => {

        // spawn new child process to call the python script using an absolute path
        const python = spawn('python3', [filePath, password, message]);
        
		// collect data from script
        python.stdout.on('data', (data)=>{collectData(data, result)});
        
		// the 'close' event is emitted when the stdio streams of a child process have been closed. 
        python.on('close', (code)=>{confirmClosed(code, resolve, reject)});
        
		// catch errors
		python.stderr.on('data', handleError);
    });

    return result;
}

function collectData(data, variableToStore) {
    let stream = data.toString();
    variableToStore.push(filterData(stream));
}

function filterData(string) {
    /* \r\n for Windows, \r for Mac, \n for Linux , then ignoring empty lines */
    let lines = string.split(/\r\n|\r|\n/).filter(line => line !== ''); 
    let codingOutput = lines.filter(line => !line.includes('SFELOG'));
    
    if (codingOutput.length === 1) {
        return codingOutput[0];
    } else {
        return undefined;
    }
}

//Function that runs when the python process is eventually closed
function confirmClosed(code, resolve, reject) {
    if (code === 0) {
        console.log(`Child process closed with code ${code}`);
        resolve();
    } else {
        console.log(`Error: Process could not be completed (${code})`);
        reject();
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