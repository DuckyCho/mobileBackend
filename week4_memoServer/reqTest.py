import requests
import json

url = "http://192.168.56.101"
port = "8080"
path = "memo"

fullURL = url+":"+port+"/"+path


print "[POST] request to "+fullURL
memo = {
	'author':'UNKNOWN',
	'memo':'NEW MEMO'
	}
postReq = requests.post(fullURL,json=memo)
print "[POST] post data : "+json.dumps(memo)
print "[POST] response from "+fullURL
print postReq.text+"\n\n"

print "[GET] request to "+fullURL
getReq = requests.get(fullURL)
print "[GET] response from "+fullURL
print getReq.text+"\n\n"

print "[PUT] request to "+fullURL
args = {'author':'UNKNOWN'}
newMemo = {'author':'UPDATED AUTHOR'}
putReq = requests.put(fullURL,params=args,json=newMemo)
print "[PUT] find params : "+json.dumps(args)+" / post data : "+json.dumps(newMemo)
print "[PUT] response from"+fullURL
print putReq.text+"\n\n"

print "[GET] request to "+fullURL
getReq = requests.get(fullURL)
print "[GET] response from"+fullURL
print getReq.text+"\n\n"

print "[DELETE] request to "+fullURL
getReq = requests.delete(fullURL,params=newMemo)
print "[DELETE] find params : "+json.dumps(newMemo)
print "[DELETE] response from"+fullURL
print getReq.text+"\n\n"

print "[GET] request to "+fullURL
getReq = requests.get(fullURL)
print "[GET] response from"+fullURL
print getReq.text+"\n\n"

