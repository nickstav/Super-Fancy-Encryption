import SFE
import json
import sys

# EXAMPLE
# string = "No more people, who when you think of them, might have once sung 'Living on a Prayer'."
# password = "ZeDonk"
password = sys.argv[1]
string = sys.argv[2]
a = SFE.encodeMessage(password, string)
b = SFE.decodeMessage(password, a)

data = {
    "password": password,
    "string": string,
    "encodedMessage": a
}

dataJSON = json.dumps(data)

print(dataJSON)



