import { get } from 'svelte/store';
import { appStatus } from './store.js';
import { sendUserInfo, sendEncryptedMessage } from './fetch.js';
import { displayEncodedMessage } from './convert.js';

function quitApp() {
	let appMode = get(appStatus).appMode;
	if (appMode === 'menu') {
		return;
	}
	const confirmation = confirm('Are you sure you want to return to the main menu?');
	if (confirmation) {
		appStatus.quitApp();
	};
}

function startEncryption() {
	appStatus.startEncrypting();
}

function startDecode() {
	appStatus.startDecoding();
}

async function checkSubmission(firstPasswordEntry, secondPasswordEntry, message) {

	// first check the password is valid
	if (checkPassword(firstPasswordEntry, secondPasswordEntry)) {

		appStatus.saveUserInfo(firstPasswordEntry, message);

		//send user data to the server and receive the encoded message as an array
		let recievedArray = await sendUserInfo(firstPasswordEntry, message);

		//convert the array into a string and display it on the app
		let encryptedMessage = displayEncodedMessage(recievedArray);
		appStatus.showEncryptedMessage(encryptedMessage);
	}
}

// function to check two password entries are valid and match
function checkPassword(firstEntry, secondEntry) {
	if (firstEntry.length < 4 || secondEntry.length < 4) {
		alert('Please enter a password of length 4-12 characters');
	} else if (firstEntry === secondEntry) {
		return true;
	} else {
		alert('Password entries do not agree. Please re-enter your password');
	}
}

async function sendEncodedMessage(password, message) {
	if (password.length > 3) {
		// send the password & message to the server
		let decodedMessage = await sendEncryptedMessage(password, message);
		if (decodedMessage) {
			//if response recieved, show the result
			appStatus.showDecodedMessage(decodedMessage);
		} else {
			// if password does not match, "undefined" will be returned
			alert('Error: Password does not match');
		}
	} else {
		alert('Please enter a password of length 4-12 characters')
	}
}

export { quitApp, startEncryption, startDecode, checkSubmission, sendEncodedMessage }