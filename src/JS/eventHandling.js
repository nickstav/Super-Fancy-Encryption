import { get } from 'svelte/store';
import { appStatus } from './store.js';

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

function checkSubmission(firstPasswordEntry, secondPasswordEntry, message) {
	if (checkPassword(firstPasswordEntry, secondPasswordEntry)) {
		appStatus.saveUserInfo(message, firstPasswordEntry);
		appStatus.showEncryptedMessage();
	}
}

function checkPassword(firstEntry, secondEntry) {
	if (firstEntry.length < 4 || secondEntry.length < 4) {
		alert('Please enter a password of length 4-12 characters');
	} else if (firstEntry === secondEntry) {
		return true;
	} else {
		alert('Password entries do not agree. Please re-enter your password');
	}
}

export { quitApp, startEncryption, startDecode, checkSubmission }