import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import aiRoutes from './routes/ai.route.js'
import {connectDB} from './lib/db.js';
import cors from 'cors';
import {app,server} from './lib/socket.js';
import cookieParser from 'cookie-parser';
import {createAIUser} from './lib/aiUser.js';
import path from "path";
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({limit:'20mb'}));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
console.log('Registering routes...');
app.use('/api/auth', authRoutes);
console.log('Auth routes registered');
app.use('/api/messages', messageRoutes);
console.log('Message routes registered');
app.use('/api/geminiAI', aiRoutes);
console.log('AI routes registered');



// ✅ Serve static files in both development and production
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
if(process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../frontend/dist");
  console.log(`Serving static files from: ${staticPath}`);
  
  app.use(express.static(staticPath));
  app.get("*", (req, res) => {
     res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
  await createAIUser();
});