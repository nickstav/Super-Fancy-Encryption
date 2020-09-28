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

export { sendUserInfo }
