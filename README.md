# SFE
- This project was built to allow a Svelte-based Javascript web app to send and receive data from a small Python encoding project.
- An express server is set up to receive user entered information from the Svelte app, and pass it onto a Javascript module.
- This module then runs one of two Python scripts (depending on whether encoding or decoding a message), passing it the user's password and message as arguments.
- The Python scripts uses the SFE project folder to print the result of the encoding/decoding.
- The JS module intercepts this output and parses the result, picking out the required data and sending back to the express server (and then onto the Svelte app).

# Install instructions
1. Make sure you've got [NodeJS](https://nodejs.org/en/download/) installed
2. Run `npx degit nickstav/super-fancy-encrytpion your-folder`
3. `cd your-folder`
4. `npm i` to install the required packages
5. Run `npm run project` to run the app in dev mode
