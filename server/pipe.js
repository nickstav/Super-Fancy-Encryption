//Function that creates the python process (passing in the script name + args), and adds pipes/onClose handling
async function runPythonSFE(password, message, filePath) {
    const { spawn } = require("child_process");
    console.debug('Piping data from Python script ...');

    // create an array in which to store gathered dataS
    let result =[];

    // create a promise that will return the required data once the process has finished running
	await new Promise((resolve, reject) => {

        // spawn new child process to call the python script using an absolute path
        const python = spawn('python3', [filePath, password, message]);
        
		// collect data from script
        python.stdout.on('data', (data)=>{
            collectData(data, result)
        });
        
		// the 'close' event is emitted when the stdio streams of a child process have been closed. 
        python.on('close', (code)=>{
            confirmClosed(code, resolve, reject)
        });
        
		// catch errors
		python.stderr.on('data', handleError);
    });

    if (result)
    return JSON.parse(result);
}

function collectData(data, variableToStore) {
    //collect all the output from python as a string
    let pythonOutputString = data.toString();
    // return the string to the variable declared in parent function
    variableToStore.push(filterPythonString(pythonOutputString));
}

function filterPythonString(string) {
    /* \r\n for Windows, \r for Mac, \n for Linux , then ignoring empty lines */
    let lines = string.split(/\r\n|\r|\n/).filter(line => line !== ''); 
    // remove SFE logs from the SFE python file to leave just the encoding request
    let codingOutput = lines.filter(line => !line.includes('SFELOG'));
    
    if (codingOutput.length === 1) {
        //if we have removed all irrelevant data, there'll be only the desired JSON remaining
        return codingOutput[0];
    } else {
        // if there is unexpected extra data, return "undefined" to throw an error
        return undefined;
    }
}

//Function that runs when the python process is eventually closed
function confirmClosed(code, resolve, reject) {
    if (code === 0) {
        console.debug(`Child process closed with code ${code}`);
        resolve();
    } else {
        console.debug(`Error: Process could not be completed (${code})`);
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

module.exports = { runPythonSFE }