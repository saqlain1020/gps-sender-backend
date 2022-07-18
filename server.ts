import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import mongoose from "mongoose";
import http from "http";
import { server as WebSocketServer } from "websocket";
import net from "net";

const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_STRING = process.env.MONGO_STRING || "";
const PORT = process.env.PORT || 8000;

const DB = MONGO_STRING.replace("<password>", MONGO_PASSWORD);

mongoose.connect(DB).then((con) => {
  console.log("connected to mogndodb");
});

// const server = http.createServer(app);
// export const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", listener);

// server.listen(PORT, () => {
//   console.log("server running on port", PORT);
// });

// Websocket Server

const requestListener: http.RequestListener = (req, res) => {
  console.log("method", req.method);
  // get body of request
  req.on("data", (chunk) => {
    console.log(`Data: ${chunk}`);
  });

  res.end("hello world");
};

const websocketPort = process.env.PORT || 80;

const server = net.createServer();
server.listen(websocketPort, () => {
  console.log("TCP Server is running on port " + Object.values(server.address()!) + ".");
});

server.on("connection", function (sock) {
  console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);

  sock.on("data", function (data) {
    console.log("DATA " + sock.remoteAddress + ": " + data);
    // Write the data back to all the connected, the client will receive it as data from the server
    console.log(sock.remoteAddress + ":" + sock.remotePort + " said " + data + "\n");
  });

  // Add a 'close' event handler to this instance of socket
  sock.on("close", function (data) {
    console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort);
  });
});

// const socketServer = http.createServer(requestListener);

// server.listen(websocketPort, () => {
//   // @ts-ignore
//   console.log("websocket server running on port", socketServer.address());
// });

// const wsServer = new WebSocketServer({
//   httpServer: socketServer,
// });

// wsServer.on("request", function (request) {
//   const connection = request.accept(null, request.origin);
//   console.log("Client has connected");

//   connection.on("message", function (message) {
//     console.log("Received Message:", message);
//     connection.sendUTF("Hi this is WebSocket server!");
//   });

//   // @ts-ignore
//   connection.on("data", function (message) {
//     console.log("Received Data:", message);
//   });

//   connection.on("close", function (reasonCode, description) {
//     console.log("Client has disconnected.");
//   });
// });

export default server;
