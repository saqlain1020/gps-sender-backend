"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locationController_1 = require("../controllers/locationController");
const Location_1 = __importDefault(require("../models/Location"));
const constants_1 = require("../utils/constants");
const server_1 = require("./../server");
const listener = (socket) => {
    let timer = new Date();
    console.log("a user connected", socket.id);
    let count = 0;
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
    socket.on("location", (data) => __awaiter(void 0, void 0, void 0, function* () {
        let obj = Object.assign(Object.assign({}, data), { senderIp: socket.handshake.address });
        try {
            // check if timer is more than 1 minute
            if (new Date().getTime() - timer.getTime() > constants_1.LOCATION_UPDATE_RATE_SECONDS * 1000) {
                console.log("Saving", count++);
                yield (0, locationController_1.saveNewLocationToDB)(obj);
                timer.setSeconds(timer.getSeconds() + constants_1.LOCATION_UPDATE_RATE_SECONDS);
            }
        }
        catch (error) {
            console.log(obj);
            console.log(error);
        }
    }));
};
let locationListener = Location_1.default.watch();
// io.emit("message",change.fullDocument)
locationListener.on("change", (change) => {
    server_1.io.emit("busLocation", change.fullDocument);
});
exports.default = listener;
//# sourceMappingURL=listener.js.map