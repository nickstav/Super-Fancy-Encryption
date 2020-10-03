function displayEncodedMessage(array) {
    let u8Array = new Uint8Array(array);
    let utf8decoder = new TextDecoder();
    let result = utf8decoder.decode(u8Array);
    return result;
}

function convertMessageToUint8(message) {
    const encoder = new TextEncoder();
    let uint8Array = encoder.encode(message);
    return Array.from(uint8Array);
}


export { displayEncodedMessage, convertMessageToUint8 }