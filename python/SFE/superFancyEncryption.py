'''
v2 changelog:
    # added log params used in our internal analytics system. 
    # updated weekly passphrase
'''

from datetime import datetime

def getLogTime():
    return datetime.now().strftime("%m/%d/%Y__%H:%M:%S")

L = len
R = range
O = ord
C = chr
J = "".join
E = enumerate

# WEEKLY SECURITY CODE PHRASE
X = "oh hello there you dapper dan"

# PUBLIC API
def encodeMessage(password, message): 
    print("SFELOG.INFO ({}): Encoding...".format(getLogTime()))
    try:
        return c(Y(password), message, 1)
    except:
        print("SFELOG.ERROR ({}): Could not encode message".format(getLogTime()))
        return None

def decodeMessage(password, message): 
    print("SFELOG.INFO ({}): Decoding...".format(getLogTime()))
    try:
        return c(Y(password), message, -1)
    except:
        print("SFELOG.ERROR ({}): Could not decode message".format(getLogTime()))
        return None

# INTERNAL
def Y(p):
    return [y for (x, y) in E(p) if x%2 == 0] if L(p)%2 else [y for (x, y) in E(p) if x%2 != 0]

def c(p, m, d):
    return J([g(p[i % L(p)], m[i], L(p), i, d) for i in R(L(m))])

def g(p, m, l, i, d):
    return C(((O(m) - O(p) + 256) % 256) - l*l*((i+1)%3) + L(X)) if d < 0 else chr((O(m) + O(p) % 256) + l*l*((i+1)%3) - L(X))

print("SFELOG.INFO ({}): SFE v0.2 loaded successfully.".format(getLogTime()))