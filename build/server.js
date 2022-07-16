"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const listener_1 = __importDefault(require("./socket/listener"));
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_STRING = process.env.MONGO_STRING || "";
const PORT = process.env.PORT || 8000;
const DB = MONGO_STRING.replace("<password>", MONGO_PASSWORD);
mongoose_1.default
    .connect(DB)
    .then((con) => {
    console.log("connected to mogndodb");
});
const server = http_1.default.createServer(app_1.default);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
exports.io.on("connection", listener_1.default);
server.listen(PORT, () => {
    console.log("server running on port", PORT);
});
exports.default = server;
//# sourceMappingURL=server.js.map