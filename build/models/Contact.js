"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    name: {
        type: String,
    },
    message: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
var Contact = mongoose_1.default.model("Contact", contactSchema);
exports.default = Contact;
//# sourceMappingURL=Contact.js.map