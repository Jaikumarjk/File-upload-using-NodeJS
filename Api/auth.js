var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
  // If they pass in a basic auth credential it'll be in a header called "Authorization" (note NodeJS lowercases the names of headers in its request object)

        var auth = req.headers['authorization'];  // auth is in base64(username:password)  so we need to decode the base64
        console.log("Authorization Header is: ", auth);

        if(!auth) {     // No Authorization header was passed in so it's the first time the browser hit us

                res.statusCode = 401;
                res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

                res.end('Authenticate required');
        }

        else if(auth) {    // The Authorization was passed in so now we validate it

                var tmp = auth.split(' ');   

                var buf = new Buffer.from(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
                var plain_auth = buf.toString();        // read it back out as a string

                //console.log("Decoded Authorization ", plain_auth);

                // At this point plain_auth = "username:password"

                var creds = plain_auth.split(':');      // split on a ':'
                var username = creds[0];
                var password = creds[1];

                if((username == 'test') && (password == 'test123')) {   // Is the username/password correct?
						next();
                }
                else {
                        res.statusCode = 401; // Force them to retry authentication
                        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

                        res.end('Access Denied');
                }
        }
})

module.exports = router;
