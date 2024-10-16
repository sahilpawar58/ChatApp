import ws from "ws";
import express from "express";

const app = express();

const wss = new ws.Server({ port: 8080 })

wss.on('connection', (socket) =>{
    socket.on('message', message => {
        console.log(message)
        socket.send(`${message}`)
    })
})

