"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const lead_controller_1 = __importDefault(require("./src/controllers/lead.controller"));
const webhook_controller_1 = __importDefault(require("./src/controllers/webhook.controller"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://mongo_user:rec123@cluster0.ayrb0el.mongodb.net/meta-webhook-db';
app.use(express_1.default.json());
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Express app!');
});
app.use('/users', lead_controller_1.default);
app.use('/webhook', webhook_controller_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
