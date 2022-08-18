"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit")); //for brute force attack
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize")); //for noSql query injections
const helmet_1 = __importDefault(require("helmet")); //Protects from various attacks eg xss etc
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const busRouter_1 = __importDefault(require("./routes/busRouter"));
const locationRouter_1 = __importDefault(require("./routes/locationRouter"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: "you've exceed the number of requests",
});
const app = (0, express_1.default)();
//implementing cors
app.use((0, cors_1.default)({ origin: true, credentials: true }));
//serving static content
// app.use(express.static("public"));
// app.use("/uploads", express.static("uploads"));
//middlewares
app.use(limiter);
app.use(express_1.default.json());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
//routers
app.use("/api/v1/bus", busRouter_1.default);
app.use("/api/v1/location", locationRouter_1.default);
app.use("/ping", (req, res) => {
    res.status(200).json({ status: true });
});
app.use("/", (req, res) => {
    res.status(200).send("Welcome.");
});
// app.use((req, res, next) => {
//   res.sendFile(__dirname + "/public/" + "index.html");
// });
// module.exports = app;
exports.default = app;
//# sourceMappingURL=app.js.map