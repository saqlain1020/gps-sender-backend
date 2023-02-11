import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import listener from "./socket/listener";
import { server as WebSocketServer } from "websocket";
import { MONGO_PASSWORD, MONGO_STRING, PORT as ENVPORT, SOCKET_SERVER_PORT } from "./utils/constants";

const PORT = ENVPORT || 8000;

const DB = MONGO_STRING.replace("<password>", MONGO_PASSWORD);

mongoose.connect(DB).then((con) => {
  console.log("connected to mogndodb");
});

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", listener);

server.listen(PORT, () => {
  console.log("server running on port", PORT);
});

// Websocket Server
const websocketPort = SOCKET_SERVER_PORT || 9898;
const socketServer = http.createServer();
socketServer.listen(websocketPort, () => {
  // @ts-ignore
  console.log("websocket server running on port", socketServer.address().port);
});

const wsServer = new WebSocketServer({
  httpServer: socketServer,
});

wsServer.on("request", function (request) {
  const connection = request.accept(null, request.origin);
  console.log("Client has connected");
  
  connection.on("message", function (message) {
    console.log("Received Message:", message);
    connection.sendUTF("Hi this is WebSocket server!");
  });
  connection.on("close", function (reasonCode, description) {
    console.log("Client has disconnected.");
  });
});
export default server;
