import requests
import json
from bs4 import BeautifulSoup
import re

url_prefix_ew = "https://www.ensie.nl/etymologisch-woordenboek/"

results = []

def clean_beschrijving(text):
    # Remove excessive whitespace and newlines
    text = re.sub(r'\n+', '\n', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = text.strip()
    # # Optionally, remove trailing sections like "Literatuur:" or "Fries:"
    # for marker in ["Literatuur:", "Fries:"]:
    #     idx = text.find(marker)
    #     if idx != -1:
    #         text = text[:idx].strip()
    return text

with open('/Users/sytse/code/vvt/woordenboek/opentaal/wordlist_test.txt', 'r') as infile:
    for line in infile:
        word = line.strip()
        url = url_prefix_ew + word
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200 and response.text.strip():
                soup = BeautifulSoup(response.text, "html.parser")
                content_div = soup.find("p", class_="meaning")
                if content_div:
                    beschrijving = content_div.get_text(separator="\n", strip=True)
                    beschrijving = clean_beschrijving(beschrijving)
                    print(f"{word}: EXISTS ({url})")
                    results.append({
                        "woord": word,
                        "beschrijving": beschrijving
                    })
                else:
                    print(f"{word}: EXISTS BUT NO CONTENT FOUND ({url})")
            else:
                print(f"{word}: DOES NOT EXIST ({url})")
        except Exception as e:
            print(f"{word}: ERROR ({url}) - {e}")

# Write all results to JSON file
with open('/Users/sytse/code/vvt/woordenboek/opentaal/woordenboek.json', 'w') as outfile:
    json.dump(results, outfile, ensure_ascii=False, indent=2)

print(results)