"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deviceController_1 = require("../controllers/deviceController");
const deviceRouter = (0, express_1.Router)();
deviceRouter.get("/", deviceController_1.getDevices);
deviceRouter.post("/", deviceController_1.addDevice);
deviceRouter.delete("/", deviceController_1.deleteDevice);
exports.default = deviceRouter;
//# sourceMappingURL=devicesRouter.js.map