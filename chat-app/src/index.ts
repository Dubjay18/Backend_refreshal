import http from "http";
import { PORT } from "./config/constants";
import { app } from "./app";
import { secureServerListen } from "./config/server";
import socketio from "socket.io";
import { JLogger } from "./utils/logger";

const server: http.Server = http.createServer(app);
import { Server } from "socket.io";
const io: Server = new Server(server);

io.on("connection", (socket) => {
  JLogger("New Web socket connection");
  socket.emit("message", "Welcome!");
  socket.on("sendMessage", (text) => {
    JLogger(`message ${text}`);
  });
});

secureServerListen(PORT, server);
