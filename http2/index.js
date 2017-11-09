/**
 * sudo node http2(use port 443 need sudo)
 */

// openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout http2/certs/nginx-selfsigned.key -out http2/certs/nginx-selfsigned.crt
const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

const {
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_METHOD,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_INTERNAL_SERVER_ERROR
} = http2.constants;

const options = {
    key: fs.readFileSync(path.join(__dirname, '/certs/selfsigned.key')),
    cert: fs.readFileSync(path.join(__dirname, './certs/selfsigned.crt')),
    allowHTTP1: true
}

const server = http2.createSecureServer(options);

const serverRoot = path.join(__dirname, "./public");

function respondToStreamError(err, stream) {
    console.log(err);
    if (err.code === 'ENOENT') {
        stream.respond({ ":status": HTTP_STATUS_NOT_FOUND });
    } else {
        stream.respond({ ":status": HTTP_STATUS_INTERNAL_SERVER_ERROR });
    }
    stream.end();
}

server.on('stream', (stream, headers) => {
    const reqPath = headers[HTTP2_HEADER_PATH];
    const reqMethod = headers[HTTP2_HEADER_METHOD];
    const fullPath = path.join(serverRoot, reqPath);
    const responseMimeType = mime.lookup(fullPath);

    if (fullPath.endsWith(".html")) {
        console.log('html');
        // handle HTML file
        stream.respondWithFile(fullPath, {
            "content-type": "text/html"
        }, {
                onError: (err) => {
                    respondToStreamError(err, stream);
                }
            });

        stream.pushStream({ ":path": "/Roboto-Medium.ttf" }, { parent: stream.id }, (pushStream) => {
            console.log('pushing');
            pushStream.respondWithFile(path.join(serverRoot, "/Roboto-Medium.ttf"), {
                'content-type': "application/x-font-ttf"
            }, {
                    onError: (err) => {
                        respondToStreamError(err, pushStream);
                    }
                });
        });

    } else {
        // handle static file
        console.log(fullPath);
        stream.respondWithFile(fullPath, {
            'content-type': responseMimeType
        }, {
                onError: (err) => respondToStreamError(err, stream)
            });
    }
});

server.on('error', (err) => {
    // listen EACCES  sudo node http2
    console.log(err);
})

server.listen(443);
console.log('open https://127.0.0.1/index.html');
