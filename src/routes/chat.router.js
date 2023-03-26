import express from "express";
const routerChat = express.Router();
import { isValidAuthToken } from "../middlewars/index.js";
import { addMsgs, getMsgs } from "../controller/chat.controller.js";

routerChat.post("/", isValidAuthToken, addMsgs);
routerChat.get("/:email", isValidAuthToken, getMsgs);
export default routerChat;
