"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(404).json({ error: "Authentiacation Token is not Provided" });
    }
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, "shiva");
        if (!decoded || typeof decoded === 'string') {
            return res.status(403).json({ error: "Invalid Token is provided" });
        }
        req.body.adminId = decoded === null || decoded === void 0 ? void 0 : decoded.id;
    }
    catch (error) {
        console.log("Authenticatin failed", error);
    }
};
exports.adminMiddleware = adminMiddleware;
