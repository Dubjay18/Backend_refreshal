import http from "http";
import { PORT } from "./config/constants";
import { app } from "./app";
import { secureServerListen } from "./config/server";
import socketio from "socket.io";
import { JLogger } from "./utils/logger";

const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server(server);
io.on("connection", () => {
  JLogger("New WebSocket connection");
});

secureServerListen(PORT, server);
