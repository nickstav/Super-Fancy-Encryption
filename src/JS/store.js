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

	function saveUserInfo(enteredMessage, password) {
		update(status => {
		  return {
			...status,
			password: password,
			message: enteredMessage
		  };
		});
	  }

	function showEncryptedMessage() {
		update(status => {
			return {
				...status,
				appMode: 'encryptionResult'
			};
		});
	}

	function showDecodedMessage() {
		update(status => {
			return {
				...status,
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
