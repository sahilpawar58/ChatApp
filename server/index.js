import {WebSocketServer} from "ws";
import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { User } from "./models/user.schema.js";
import "./services/mongoConnect.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use('/api/user',userRouter);

const expressServer = app.listen(PORT, ()=>{
    console.log('listing on port '+PORT)
})



const io = new Server(expressServer, {
    cors: {
        origin: "*"
    }
})


io.on('connection', (socket) =>{
    console.log(`User ${socket.id} connected`)

    socket.emit('message','Welcom to Chat App');

    socket.broadcast.emit('message',`User ${socket.id.substring(0,5)} connected`);

    socket.on('message', data => {
        console.log(data);
        io.emit('message', `${socket.id.substring(0,5)}: ${data}`)
    });

    // socket.on('disconnect', ()=> {
    //     console.log(`User ${socket.id.substring(0,5)} disconnected`);
    //     socket.broadcast.emit('message',`User ${socket.id.substring(0,5)} disconnected`)
    // })

    socket.on('activity', (name) =>{
        socket.broadcast.emit('activity',name)
    })
})

