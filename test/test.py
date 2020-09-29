import SFE
import json
import sys

password = sys.argv[1]
string = sys.argv[2]
a = SFE.encodeMessage(password, string)
b = SFE.decodeMessage(password, a)

data = {
    "password": password,
    "string": string,
    "encodedMessage": a,
    "decodedMessage": b
}

dataJSON = json.dumps(data)

print(dataJSON)


