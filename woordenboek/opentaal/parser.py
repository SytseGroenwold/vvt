import time
import requests
import json
from bs4 import BeautifulSoup
import re

url_prefix_ew = "https://www.ensie.nl/etymologisch-woordenboek/"

results = []

with open('/Users/sytse/code/vvt/woordenboek/opentaal/wordlist.txt', 'r') as infile:
    i = 0
    for line in infile:
        if i > 10:
            break
        word = line.strip()
        url = url_prefix_ew + word
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 404:
                print(f"404: {word}: DOES NOT EXIST ({url})")
                continue
            if response.status_code == 200 and response.text.strip():
                soup = BeautifulSoup(response.text, "html.parser")
                content_div = soup.find("p", class_="meaning")
                if content_div:
                    beschrijving = content_div.get_text(separator="\n", strip=True)
                    print(f"{word}: EXISTS ({url})")
                    results.append({
                        "woord": word,
                        "beschrijving": beschrijving
                    })
                    i += 1
                    time.sleep(1)
                else:
                    print(f"{word}: EXISTS BUT NO CONTENT FOUND ({url})")
            else:
                print(f"{word}: DOES NOT EXIST")
                time.sleep(1)
        except Exception as e:
            print(f"{word}: ERROR ({url}) - {e}")

# Write all results to JSON file
with open('/Users/sytse/code/vvt/woordenboek/opentaal/woordenboek.json', 'w') as outfile:
    json.dump(results, outfile, ensure_ascii=False, indent=2)

print(results)