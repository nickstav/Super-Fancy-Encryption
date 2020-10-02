// declare a variable to store the password on the server
let password = 'nick';

/* ----------------------Get required npm packages------------------------------*/

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
        console.log('User Message received:' + userInfo.message);

        password = userInfo.password;
        console.log('User password saved');

        let message = runEncryption(userInfo.message);
        res.send(message);
        console.log('Encrypted message sent');
    } catch (error) {
        console.log(error);
    };
}

function runEncryption(message) {
    let encryptedMessage = 'I have encrypted "' + message + '"!';
    console.log('Encrypted Message: ' + encryptedMessage);
    return encryptedMessage;
}

async function decodeMessage(req, res) {
    try {
        const userInfo = req.body;
        console.log('Received user info');

        if (checkPassword(userInfo.password)) {
            let decodeResult = runDecoding(userInfo.messageAsArray);
            res.send(decodeResult);
        } else {
            sendPasswordError(res);
        } 
    } catch (error) {
        console.log(error);
    };
}

function checkPassword(userPassword) {
    if (userPassword === password) {
        console.log('Password matches')
        return true;
    } else {
        return false;
    }
}

function sendPasswordError(res) {
    console.error('Error: Password does not match')
    res.send(undefined);
}

function runDecoding(array) {
    console.log(array);
    let message = "A decoded message";
    return message;
}