import express from "express";
import http from "node:http";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import path from "node:path";
import { fileURLToPath } from 'url';
import cors from "cors";
import { PORT } from "./config.js";

// Crear __dirname utilizando fileURLToPath y path.dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initializations
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// Middleware para servir archivos estáticos desde 'client/dist'
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// Middleware para redirigir todas las rutas a 'index.html' (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// WebSockets
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("message", ({ body, date }) => {
    socket.broadcast.emit("message", {
      body,
      date,
      from: socket.id.slice(8),
    });
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}!`));
