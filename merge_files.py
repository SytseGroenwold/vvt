import glob 

path = r'/Users/sytse/code/btl/woordenlijst/*.txt'
files = sorted(glob.glob(path))
print(files)

with open('/Users/sytse/code/btl/woordenlijst/woordenlijst.txt', 'w') as outfile:
    for fname in files:
        with open (fname) as tempfile:
            outfile.write(tempfile.read())
