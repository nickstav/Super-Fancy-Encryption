# ¯\_(ツ)_/¯
L = len
R = range
O = ord
C = chr
J = "".join
E = enumerate

# WEEKLY SECURITY CODE PHRASE
X = "oh hello there you silly goose"

# PUBLIC API
def encodeMessage(password, message): 
    return c(Y(password), message, 1)

def decodeMessage(password, message): 
    return c(Y(password), message, -1)

# INTERNAL
def Y(p):
    return [y for (x, y) in E(p) if x%2 == 0] if L(p)%2 else [y for (x, y) in E(p) if x%2 != 0]

def c(p, m, d):
    return J([g(p[i % L(p)], m[i], L(p), i, d) for i in R(L(m))])

def g(p, m, l, i, d):
    return C(((O(m) - O(p) + 256) % 256) - l*l*((i+1)%3) + L(X)) if d < 0 else chr((O(m) + O(p) % 256) + l*l*((i+1)%3) - L(X))