import SFE
import json
import sys

password = sys.argv[1]
string = sys.argv[2]

def encodeMessageAndConvertToUInt8(password, message):
    encodedMessage = SFE.encodeMessage(password, message)
    
    # convert to a uint8Array representation for better handling (due to non ascii characters)
    encodedMessageAsBytes = bytes(encodedMessage, 'utf-8')
    encodedMessageAsUInt8 = list(encodedMessageAsBytes)

    # convert an array of strings to an array of integers
    for i in range(0, len(encodedMessageAsUInt8)): 
        encodedMessageAsUInt8[i] = int(encodedMessageAsUInt8[i])

    return encodedMessageAsUInt8

data = {
    "password": password,
    "string": string,
    "encodedMessageAsUInt8": encodeMessageAndConvertToUInt8(password, string)
}

dataJSON = json.dumps(data)

print(dataJSON)