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
const lead_repository_1 = __importDefault(require("../repositories/lead.repository"));
const const_1 = require("../utils/const");
const router = (0, express_1.Router)();
// Create a new lead
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leadData = req.body;
        const newLead = yield lead_repository_1.default.createLead(leadData);
        res.json(newLead);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create lead' });
    }
}));
// Get all leads
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parse params from the webhook verification request
        let mode = req.query["hub.mode"];
        let token = req.query["hub.verify_token"];
        let challenge = req.query["hub.challenge"];
        // Check if a token and mode were sent
        if (mode && token) {
            // Check the mode and token sent are correct
            if (mode === "subscribe" && token === const_1.verify_token) {
                // Respond with 200 OK and challenge token from the request
                console.log("WEBHOOK_VERIFIED");
                res.status(200).send(challenge);
            }
            else {
                // Responds with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403).json({ error: 'Failed to subscribe webhook' });
                ;
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to register webhook' });
    }
}));
exports.default = router;
