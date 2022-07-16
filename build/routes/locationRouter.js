"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locationController_1 = require("../controllers/locationController");
const locationRouter = (0, express_1.Router)();
locationRouter.post("/", locationController_1.postLocation);
locationRouter.get("/:busId", locationController_1.getLocation);
locationRouter.get("/current/:busId", locationController_1.getCurrentLocation);
exports.default = locationRouter;
//# sourceMappingURL=locationRouter.js.map