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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const Adminrouter = (0, express_1.Router)();
const adminSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(18)
});
Adminrouter.post("signUp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validSchema = adminSchema.safeParse(req.body);
        if (!validSchema.success) {
            console.log("Invalid Input", validSchema.error);
            return;
        }
        else {
            const admin = yield prisma.admin.create({
                data: {
                    name: validSchema.data.name,
                    email: validSchema.data.email,
                    password: validSchema.data.password
                }
            });
            const token = jsonwebtoken_1.default.sign({ name }, "secretshiva");
            res.json({ token });
        }
    }
    catch (error) {
        console.error("Something went wrong ", error);
    }
}));
Adminrouter.post("/signIn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.admin.findFirst({
            where: {
                email: email,
                password: password
            }
        });
        const token = jsonwebtoken_1.default.sign({ email }, "shivasecret");
        res.json({ token });
    }
    catch (error) {
        console.error("Error while signibg in", error);
    }
}));
exports.default = Adminrouter;
