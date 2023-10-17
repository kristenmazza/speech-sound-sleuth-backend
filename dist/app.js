"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = require("path");
const router_1 = require("./routes/router");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
// Removes prepatory warnings for Mongoose 7.
mongoose_1.default.set('strictQuery', false);
// Initialize middleware
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static((0, path_1.join)(__dirname, 'public')));
app.use('/', router_1.router);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
module.exports = app;
