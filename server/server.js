// declare a variable to store the password on the server
let password = 'nick';
let testMessage = [194, 165, 194, 175, 195, 130, 93, 195, 152, 194, 178, 195, 158, 195, 171, 194, 157, 194, 150, 194, 149, 194, 158, 195, 157, 195, 141, 194, 179, 195, 149, 194, 168, 194, 189, 194, 172, 195, 184, 194, 167, 195, 168, 194, 167, 194, 140, 195, 151, 195, 172, 194, 186, 195, 167, 194, 132];

/* ----------------------Get required npm packages------------------------------*/

const encode = require('./encode')
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


let thing = encode.runEncryption('nick', 'Hey Diddly Dee! An Actors life for me!');
console.log(thing);

app.post('/userInfo', encodeMessage);

app.post('/encryptedMessage', decodeMessage);

async function encodeMessage(req, res) {
    try {
        const userInfo = req.body;
        console.log('User Message received: ' + userInfo.message);

        password = userInfo.password;
        console.log('User password saved');

        let message = runDaEncryption(userInfo.message);
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

function runDaEncryption(message) {
    let encryptedMessage = 'I have encrypted "' + message + '"!';
    console.log('Encrypted Message: ' + encryptedMessage);
    return testMessage;
}

function checkPassword(userPassword) {
    if (userPassword === password) {
        console.log('Password matches');
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