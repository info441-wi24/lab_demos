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
        const message = JSON.parse(msg);  
        try{
          if (message["action"] == "updateName") {
            allWebSockets[myIndex].name = message.name;
            console.log(allWebSockets[myIndex].name);
          } else if (message["action"] == "sendMessage") {
            const name = allWebSockets[myIndex].name;
            const currentMessage = message.message;
            for (const [socketNum, socketInfo] of Object.entries(allWebSockets)) {
              socketInfo.socket.send(name + ": " + currentMessage);
            }
          } else {
            throw new Error("no such an action");
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
