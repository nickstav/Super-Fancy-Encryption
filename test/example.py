import SFE

# EXAMPLE
string = "No more people, who when you think of them, might have once sung 'Living on a Prayer'."
password = "ZeDonk" #12 char max
print("EncryptorPy Example")
print("\tPassword :\t", password)
print("\tInitial String :", string)

a = SFE.encodeMessage(password, string)
print("\tEncoded String :", a)

b = SFE.decodeMessage(password, a)
print("\tDecoded String :", b)

print("\tEncode/Decode Succeeded" if b == string else "\tEncode/Decode Failed")