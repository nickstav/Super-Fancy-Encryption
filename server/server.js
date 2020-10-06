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
        console.log('User Message received: ' + userInfo.message);

        password = userInfo.password;
        console.log('User password received');

        //encode the message and send back the result
        let message = await runPythonEncoding(userInfo.password, userInfo.message);
        res.send(message);
        console.log('Encrypted message sent');

    } catch (error) {
        console.log(error);
    };
}

async function decodeMessage(req, res) {
    try {
        // recieve the encoded message from the front-end
        const userInfo = req.body;
        console.log('Received user info');

        // decode the message and send back the result
        let decodeResult = await runPythonDecoding(userInfo.password, userInfo.messageAsArray);
        res.send(decodeResult);
        console.log('Decoded message sent');

    } catch (error) {
        console.log(error);
    };
}

/* --------------------Interaction with python folder---------------------------*/

async function runPythonEncoding(password, message) {
    //define absolute path to encode python file
    let encodePath = path.resolve(__dirname, "..", 'python', 'encode.py');

    let encryptionResult = await pipe.runPythonSFE(password, message, encodePath);
    if (encryptionResult) {
        console.log('Message encoded and received by SFE encryption');
        return encryptionResult.encodedMessageAsUInt8;
    } else {
        console.log("Error: No SFE data received");
    }
}

async function runPythonDecoding(password, array) {
    // define absolute path to decode python file
    let decodePath = path.resolve(__dirname, "..", 'python', 'decode.py');

    let decodeResult = await pipe.runPythonSFE(password, array, decodePath);
    if (decodeResult) {
        console.log('Message decoded and received by SFE encryption');
        return decodeResult.decodedMessage;
    } else {
        console.log("Error: No SFE data received");
    }
    
}
