import requests
import json

url="http://localhost:8080/urisService/in"
url_back="http://reynaldocv.pythonanywhere.com/post"

data = {'sites': ["https://www.falconarmas.com.br/","https://www.pescaeciashop.com.br","http://www.brasiltatica.com.br","https://arsenaisbelicos.wixsite.com/armas","https://www.linkrosa.com.br/","https://www.photoacompanhantes.com/","https://garotacomlocal.com/","https://www.travesticomlocal.com.br/","https://garotocomlocal.com.br/","https://www.mundodovapor.com/","https://www.elitesmokebr.com/","https://www.vaporesabor.com.br/","https://www.queenflavor.com/","https://www.peruibebebidas.com","https://www.oskaras.com/cytotec/","https://comprarcytotecriod.wixsite.com/","http://www.cscentralvip.com/","http://telecstv.com/cs/","https://story.lightninggadget.com/articles/tvradius/br/bigblue/"] ,'callback':url_back}

headers = {'Content-type': 'application/json', 'Accept': 'application/json'}

r = requests.post(url, data=json.dumps(data), headers=headers)

print(r.text)





