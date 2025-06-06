import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import messageRoutes from './routes/message.route.js'
import { app, server } from './lib/socket.js'
import cors from 'cors'

import path from 'path'

dotenv.config();

const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})