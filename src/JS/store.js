import { writable } from 'svelte/store';

const defaultValues = {
	appMode: 'menu',
	password: undefined,
	message: '',
	encryptedMessage: undefined,
	decodedMessage: undefined
};

function setUpStore() {

	const { subscribe, set, update } = writable(defaultValues);

	function quitApp() {
		set(defaultValues);
	}
	
	function startEncrypting() {
		update(status => {
			return {
				...status,
				appMode: 'encrypt'
			};
		});
	}

	function startDecoding() {
		update(status => {
			return {
				...status,
				appMode: 'decode'
			};
		});
	}

	function saveUserInfo(userPassword, enteredMessage) {
		update(status => {
		  return {
			...status,
			password: userPassword,
			message: enteredMessage
		  };
		});
	  }

	function showEncryptedMessage(receivedMessage) {
		update(status => {
			return {
				...status,
				encryptedMessage: receivedMessage,
				appMode: 'encryptionResult'
			};
		});
	}

	function showDecodedMessage(receivedMessage) {
		update(status => {
			return {
				...status,
				decodedMessage: receivedMessage,
				appMode: 'decodeResult'
			};
		});
	}
	
	return {
		subscribe,
		set,
		quitApp,
		startEncrypting,
		startDecoding,
		saveUserInfo,
		showEncryptedMessage,
		showDecodedMessage
	};

}

export const appStatus = setUpStore();
