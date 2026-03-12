m = int(input())
n = int(input())
if m < 45:
    m += 15
    n -= 1
else:
    m -= 45
if n < 0:
    n += 24
    m += 15
print(n, m)