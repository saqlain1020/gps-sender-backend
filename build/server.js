"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const websocket_1 = require("websocket");
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_STRING = process.env.MONGO_STRING || "";
const PORT = process.env.PORT || 8000;
const DB = MONGO_STRING.replace("<password>", MONGO_PASSWORD);
mongoose_1.default.connect(DB).then((con) => {
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
const websocketPort = process.env.PORT || 8000;
const socketServer = http_1.default.createServer();
socketServer.listen(websocketPort, () => {
    // @ts-ignore
    console.log("websocket server running on port", socketServer.address().port);
});
const wsServer = new websocket_1.server({
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
exports.default = socketServer;
//# sourceMappingURL=server.js.map