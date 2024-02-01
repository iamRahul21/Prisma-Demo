"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/user", user_1.default);
app.get("/user", (req, res) => {
    console.log("You have used / path");
    res.send("Hello World");
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log("your server is running at http://localhost:3000");
});
