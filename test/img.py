import requests
import json

url="http://localhost:8080/urisService/imagens"
url_back="http://reynaldocv.pythonanywhere.com/post"

data = {'sites': ["http://www.taurusarmas.com.br/pt/produtos/pistolas"] ,'callback':url_back}

headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

r = requests.post(url, data=json.dumps(data), headers=headers)

print(r.text)





