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
exports.deleteContact = exports.addContact = exports.getContacts = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let contacts = yield new apiFeatures_1.default(Contact_1.default.find(), req.query).limitFields().sort().paginate().get();
        res.status(200).json({
            status: true,
            data: contacts,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.getContacts = getContacts;
const addContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let contact = yield Contact_1.default.create(req.body);
        res.status(200).json({
            status: true,
            data: contact,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.addContact = addContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let contact = yield Contact_1.default.findByIdAndDelete(req.body.id);
        res.status(200).json({
            status: true,
            data: contact,
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.deleteContact = deleteContact;
//# sourceMappingURL=contactController.js.map