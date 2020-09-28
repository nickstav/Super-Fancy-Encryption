/* ----------------------Get required npm packages------------------------------*/

const express = require("express");
const cors = require("cors");

/* -----------------------Set up server on a local port------------------------ */

const app = express();
const port = 4000;
app.use(cors());
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

/* --------------------Interaction with the front end---------------------------*/

app.post('/userInfo', encodeMessage);

async function encodeMessage(req, res) {
    try {
        const userInfo = req.body;
        console.log('User Message:' + userInfo.message);
        let message = runEncryption(userInfo.password, userInfo.message);
        res.send(message);
    } catch (error) {
        console.log(error);
    };
  }

  function runEncryption(password, message) {
      console.log('password: ' + password);
      let encryptedMessage = 'I have encrypted "' + message + '"!';
      console.log('Encrypted Message: ' + encryptedMessage);
      return encryptedMessage;
  }