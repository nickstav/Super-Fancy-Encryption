// declare a variable to store the password on the server

let password = 'nick';

/* ----------------------Get required npm packages------------------------------*/

const encode = require('./encode');
const decode = require('./decode');
const express = require("express");
const cors = require("cors");

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
        const userInfo = req.body;
        console.log('User Message received: ' + userInfo.message);

        password = userInfo.password;
        console.log('User password saved');

        let message = await runPythonEncoding(userInfo.password, userInfo.message);
        res.send(message);
        console.log('Encrypted message sent');

    } catch (error) {
        console.log(error);
    };
}

async function decodeMessage(req, res) {
    try {
        const userInfo = req.body;
        console.log('Received user info');

        let decodeResult = await runPythonDecoding(userInfo.password, userInfo.messageAsArray);
        res.send(decodeResult);
        console.log('Decoded message sent');

    } catch (error) {
        console.log(error);
    };
}

/* --------------------Interaction with python folder---------------------------*/

async function runPythonEncoding(password, message) {
    let encryptionResult = await encode.runEncryption(password, message);
    console.log('Message encoded by SFE encryption');
    return encryptionResult.encodedMessageAsUInt8;
}

async function runPythonDecoding(password, array) {
    let decodeResult = await decode.runDecoding(password, array);
    console.log('Message decoded by SFE encryption');
    return decodeResult.decodedMessage;
}
