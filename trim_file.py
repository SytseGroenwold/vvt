with open('/Users/sytse/code/btl/woordenlijst/woordenlijst.txt', 'r') as infile, open('/Users/sytse/code/btl/woordenlijst/woordenboek.txt', 'w') as outfile:
    for line in infile:
        if line.strip():
            outfile.write(line)
