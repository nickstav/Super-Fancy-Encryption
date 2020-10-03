import { convertMessageToUint8 } from './convert.js';

async function sendUserInfo(password, message) {
    const address = 'http://localhost:4000/userInfo';
    const userInfo = {password, message};
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      };

    try {
        const response = await fetch(address, options);
        const encodedMessage = await response.json();
        return encodedMessage;
      } catch (error) {
        console.error(error);
      };
}

async function sendEncryptedMessage(password, encodedMessage) {
    //convert string to array before sending to the server
    let messageAsArray = convertMessageToUint8(encodedMessage);

    const address = 'http://localhost:4000/encryptedMessage';
    const userInfo = {password, messageAsArray};
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      };

    try {
        const response = await fetch(address, options);
        const decodedMessage = await response.text();
        return decodedMessage;
      } catch (error) {
        console.error(error);
      };
}


export { sendUserInfo, sendEncryptedMessage }
