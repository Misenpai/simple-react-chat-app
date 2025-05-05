import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("New Client Connected");

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("messages", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
