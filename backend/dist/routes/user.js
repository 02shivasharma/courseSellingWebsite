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
const authMiddleware_1 = require("../middleware/authMiddleware");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const UserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
const UserSignInSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
userRouter.post("/singup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = UserSchema.safeParse(req.body);
        if (!result.success) {
            console.log("Input is not valid", result.error);
            return;
        }
        else {
            const user = yield prisma.user.create({
                data: {
                    username: result.data.username,
                    email: result.data.email,
                    password: result.data.password
                }
            });
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, "secretShiva");
            res.json({ token });
        }
    }
    catch (error) {
        console.log("Something went wrong while signing up", error);
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = UserSignInSchema.safeParse(req.body);
        if (!result.success) {
            console.log("Invalid Input", result.error);
            return;
        }
        else {
            const user = yield prisma.user.findFirst({
                where: {
                    email: result.data.email
                }
            });
            if (!user) {
                res.status(404).json({ error: "User Doesn't exsitsts" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email }, "secretShiva");
            res.json({ token });
        }
    }
    catch (error) {
        console.log("Something went wrong while signing In", error);
    }
}));
userRouter.get("/courses", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield prisma.course.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
            }
        });
        res.json({ courses });
    }
    catch (error) {
        console.error("Error While fethcing courses");
    }
}));
userRouter.get("/courses/:id", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield prisma.course.findFirst({
            where: {
                id: parseInt(id)
            }
        });
        if (!course) {
            res.json({ error: "Error while finding this course" });
        }
        res.json({ course });
    }
    catch (error) {
        console.error("Error foundingl this course", error);
    }
}));
exports.default = userRouter;
