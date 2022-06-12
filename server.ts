import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import listener from "./socket/listener";

const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_STRING = process.env.MONGO_STRING || "";
const PORT = process.env.PORT || 8000;

const DB = MONGO_STRING.replace("<password>", MONGO_PASSWORD);

mongoose
  .connect(DB)
  .then((con) => {
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

export default server;

