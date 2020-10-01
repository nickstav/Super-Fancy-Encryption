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
        const encodedMessage = await response.text();
        return encodedMessage;
      } catch (error) {
        console.error(error);
      };
}

async function sendEncryptedMessage(password, encodedMessage) {
    const address = 'http://localhost:4000/encryptedMessage';
    const userInfo = {password, encodedMessage};
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

  let message = [194, 165, 194, 175, 195, 130, 93, 195, 152, 194, 178, 195, 158, 195, 171, 194, 157, 194, 150, 194, 149, 194, 158, 195, 157, 195, 141, 194, 179, 195, 149, 194, 168, 194, 189, 194, 172, 195, 184, 194, 167, 195, 168, 194, 167, 194, 140, 195, 151, 195, 172, 194, 186, 195, 167, 194, 132]
	let encrypted = String.fromCharCode.apply(null, message);
	console.log(encrypted)

export { sendUserInfo, sendEncryptedMessage }
