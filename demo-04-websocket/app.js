import fs from 'fs';
import express from 'express';
import enableWs  from 'express-ws';


const app = express();
enableWs(app);

app.get(['/', '/index.html'], (req, res) => {
  res.type('html')
  let cssContents = fs.readFileSync("index.html").toString();
  res.send(cssContents)
})


let allWebSockets = {};
let userIndex = 1;

app.ws('/socket', function(ws, req) {
    const myIndex = userIndex;
    allWebSockets[myIndex] = {
      socket: ws,
      name: myIndex
    };
    console.log("socket " + myIndex + " connected!");
    userIndex++;

    ws.on('message', function(msg) {
        try{
            for (const [socketNum, socketInfo] of Object.entries(allWebSockets)) {
              socketInfo.socket.send(myIndex + ": " + msg);
            }
          
        }catch(error) {
          console.error("Websocket message recieve error: " + error);
        }

    });

    ws.on('close', () => {
        delete allWebSockets[myIndex];
        console.log('WebSocket '+ myIndex + ' was closed')
    })
  });


app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
