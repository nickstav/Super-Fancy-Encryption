/* ----------------------Get required npm packages------------------------------*/

const pipe = require('./pipe');
const express = require("express");
const cors = require("cors");
const path = require('path');

/* -----------------------Set up server on a local port------------------------ */

const app = express();
const port = 4000;
app.use(cors());
app.use(express.static('../public'));
app.use(express.json({ limit: '1mb' }));
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

/* --------------------Interaction with the front end---------------------------*/

app.post('/userInfo', encodeMessage);

app.post('/encryptedMessage', decodeMessage);


async function encodeMessage(req, res) {
    try {
        // receive user message/password from the front end
        const userInfo = req.body;
        console.debug('User Message received: ' + userInfo.message);

        password = userInfo.password;
        console.debug('User password received');

        //encode the message and send back the result
        let message = await runPythonEncoding(userInfo.password, userInfo.message);
        res.send(message);
        console.debug('Encrypted message sent');

    } catch (error) {
        console.log(error);
    };
}

async function decodeMessage(req, res) {
    try {
        // recieve the encoded message from the front-end
        const userInfo = req.body;
        console.debug('Received user info');

        // decode the message and send back the result
        let decodeResult = await runPythonDecoding(userInfo.password, userInfo.messageAsArray);
        res.send(decodeResult);
        console.debug('Decoded message sent');

    } catch (error) {
        console.error(error);
    };
}

/* --------------------Interaction with python folder---------------------------*/

async function runPythonEncoding(password, message) {
    //define absolute path to encode python file
    let encodePath = path.resolve(__dirname, "..", 'python', 'encode.py');

    try {
        let encryptionResult = await pipe.runPythonSFE(password, message, encodePath);

        if (encryptionResult) {
            // if python info was recieved, return the relevant data
            console.debug('Message encoded and received by SFE encryption');
            return encryptionResult.encodedMessageAsUInt8;
        } else {
            // undefined will be returned if the python script did not return the expected data
            console.error("Error: No SFE data received");
        }

    } catch (error) {
        // catch any other type of error
        console.error(error);
    }
}

async function runPythonDecoding(password, array) {
    // define absolute path to decode python file
    let decodePath = path.resolve(__dirname, "..", 'python', 'decode.py');

    try {
        let decodeResult = await pipe.runPythonSFE(password, array, decodePath);

        if (decodeResult !== undefined) {
            // if python info was recieved, return the relevant data
            console.debug('Message decoded and received by SFE encryption');
            return decodeResult.decodedMessage;
        } else {
            // undefined will be returned if the python script did not return the expected data
            console.error("Error: No SFE data received");
        }

    } catch (error) {
        // catch any other type of error
        console.error(error);
    }
    
}
