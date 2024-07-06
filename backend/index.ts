import express, { Request, Response, NextFunction } from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db";
import errorHandler from "./middlewares/error";
import { UserRouter } from "./routes/user";

dotenv.config();
const PORT = process.env.PORT ? process.env.PORT : 3000;
const app = express();

// Middleware for body parsing
app.use(
    cors({
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Routes
app.use("/user", UserRouter());
app.use("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    throw new Error("Endpoint not found!");
});

// Error boundary
app.use(errorHandler);

connectDb()
    .then(() => {
        // Create a new web server and open a port to listen request
        const server = http.createServer(app);
        server.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        );
    })
    .catch((err) => console.log(err));
