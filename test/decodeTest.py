import SFE
import json
import sys

password = sys.argv[1]
UInt8Array = sys.argv[2].split(',')

def decodeMessage(array):
    # convert an array of strings to an array of intergers
    for i in range(0, len(array)): 
        array[i] = int(array[i]) 
    
    #convert the array back into bytes and then into the original string
    messageAsBytes = bytes(array)
    encodedMessage = str(messageAsBytes, 'utf-8')

    #decode the string
    decodedMessage = SFE.decodeMessage(password, encodedMessage)

    return decodedMessage


data = {
    "password": password,
    "decodedMessage": decodeMessage(UInt8Array)
}

dataJSON = json.dumps(data)

print(dataJSON)