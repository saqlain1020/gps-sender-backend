"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const busController_1 = require("../controllers/busController");
const busRouter = (0, express_1.Router)();
busRouter.get("/", busController_1.getBuses);
busRouter.delete("/", busController_1.deleteBus);
busRouter.get("/:id", busController_1.getBusById);
busRouter.post("/", busController_1.addBus);
exports.default = busRouter;
//# sourceMappingURL=busRouter.js.map