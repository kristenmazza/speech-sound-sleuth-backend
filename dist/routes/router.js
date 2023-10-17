"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
// const tasks = require('./tasks');
// module.exports = {
//   tasks,
// };
// import express, { Request, Response, NextFunction } from 'express';
// import taskRoutes from './Tasks';
// const app = express();
// const port = process.env.PORT || 3000;
// app.use(express.json()); // Add this line to enable JSON parsing in the request body
// app.use('/tasks', taskRoutes); // Add this line to mount the Task API routes
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, TypeScript Express!');
// });
// // Add error handling middleware
// app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong');
// });
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
