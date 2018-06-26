from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import SocketServer
import simplejson
import random

### YOU'll NEED TO KEEP THIS SERVER UP AND RUNNING AT ALL TIMES ON YOUR SERVER COMPUTER IN YOUR COMPANY
### you can test this script with postman, chrome, curl, and a terminal
### but in order to make it work for real you will have to register a url of your own on wrike later # 1. REGISTER your endpoint URL by doing the tutorial from https://developers.wrike.com/documentation/webhooks
### Pay attention to the port being used, as it might cause conflict with other apps running on the server

PORT_NUMBER = 8089

class S(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        ##self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE') # If needed
        #self.send_header('Access-Control-Allow-Headers', 'X-Requested-With,contenttype')# If needed
        ##self.send_header('Access-Control-Allow-Credentials', True)
        self.end_headers()

    def do_GET(self): ## DEFINE WHAT YOU WANT TO DO IF THE USER SENDS A GET
        self._set_headers()

        print "Someone did a GET request to %s" % (self.path) # 2. path is whatever the user types after your URL
        ### test calling on browser localhost:8089/hahahahuhsaduh , localhost:8089/a, localhost:8089/, localhost:8089/somepath and check what is printed

        if self.path == '/DUMP_TO_DATABASE': # 3.if the path the user typed in the url is DUMP_TO_DATABSE on the browser or curl or postman
          print "someone is actually telling to dumb into the DB"
          ### 3. CALL ALL THE WRIKE APIS HERE AND GET THE DATE ###
          ## This is where you'd use the requests lib to call those endpoints you need

          ## 4. INSERT THE LOGIC TO DUMP THE RETRIEVED DATA INTO THE DB HRE#
        if self.path == '/projects':
            json_data = open('jsonModel.json').read()
            self.wfile.write(json_data)
        return

        


    def do_HEAD(self):
        self._set_headers()

    def do_POST(self): ## DEFINE WHAT YOU WANT TO DO IF THE USER SENDS A POST
        self._set_headers()
        print "in post method"
        self.data_string = self.rfile.read(int(self.headers['Content-Length']))

        self.send_response(200)
        self.end_headers()

        data = simplejson.loads(self.data_string)

        ### 5. Test by doing a POST through postman sending {"hi":"hey"} or {"key_name": "value"} through the raw mode
        print data
        return


def run(server_class=HTTPServer, handler_class=S, port=PORT_NUMBER):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print 'Starting httpd...'
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

if len(argv) == 2:
    run(port=int(argv[1]))
else:
    run()