import requests


url = "http://127.0.0.1:8080/readmemo"
req = requests.get(url)

print req.text
