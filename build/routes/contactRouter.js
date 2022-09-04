"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const contactRouter = (0, express_1.Router)();
contactRouter.get("/", contactController_1.getContacts);
contactRouter.post("/", contactController_1.addContact);
contactRouter.delete("/", contactController_1.deleteContact);
exports.default = contactRouter;
//# sourceMappingURL=contactRouter.js.map