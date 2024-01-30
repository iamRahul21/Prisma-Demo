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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
//GET
router.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield prisma.user.findMany();
        res.send(users);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
//POST
router.post('/addUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let name = req.body.name;
        let age = req.body.age;
        let role = req.body.Role;
        let email = req.body.email;
        let user = yield prisma.user.create({
            data: {
                name: name,
                age: age,
                role: role,
                email: email
            }
        });
        res.send(user);
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = router;
