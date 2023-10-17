/**
 * This file creates a server using the http module and sets up a socket.io server to handle real-time communication between clients.
 * @packageDocumentation
 */

import http from "http";
import { PORT } from "./config/constants";
import { app } from "./app";
import { secureServerListen } from "./config/server";
import { Server } from "socket.io";
import JLogger from "./utils/logger";

/**
 * The http server instance.
 */
const server: http.Server = http.createServer(app);

/**
 * The socket.io server instance.
 */
const io: Server = new Server(server);

io.on("connection", (socket) => {
  JLogger("New Web socket connection");

  /**
   * Sends a welcome message to the client upon connection.
   */
  socket.emit("message", "Welcome!");

  /**
   * Sends a message to all clients except the one that initiated the connection.
   */
  socket.broadcast.emit("message");

  /**
   * Listens for a "sendMessage" event from the client and emits the message to all clients.
   * Also logs the message using the JLogger utility.
   * @param text - The message text.
   */
  socket.on("sendMessage", (text: string) => {
    io.emit("message", text);
    JLogger(`message ${text}`);
  });

  socket.on("sendLocation", (location) => {
    io.emit(
      "message",
      `location ${location.lat}, ${location.long}`
    );
    JLogger(`location ${location.lat}, ${location.long}`);
  });
  /**
   * Listens for a "disconnect" event from the client and emits a message to all clients.
   */
  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
});

/**
 * Starts the secure server listening on the specified port.
 */
secureServerListen(PORT, server);
