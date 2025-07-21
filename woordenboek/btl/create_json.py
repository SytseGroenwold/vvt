with open('/Users/sytse/code/btl/woordenlijst/woordenboek.txt', 'r') as infile, open('/Users/sytse/code/btl/woordenlijst/woordenboek.json', 'w') as outfile:
    outfile.write("woordenboek = '[")
    json_start = '{"woord": "'
    json_middel = '","beschrijving":"'
    json_eind = '"},'
    for line in infile:
        splitted = line.split(" ", 1)
        entry = json_start + splitted[0] + json_middel + splitted[1].strip() + json_eind
        outfile.write(entry)
