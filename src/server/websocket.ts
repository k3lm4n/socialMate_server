import { io } from ".";
import { Room } from "../utils/types/@types";

const users: Room[] = [];

io.on("connection", (socket) => {
  socket.on("connectedOn", async (data) => {
    socket.join(data.chatId);

    const userInRoom = users.find(
      (user) => user.senderId === data.senderId && user?.chatId === data?.chatId
    );

    if (userInRoom) {
      userInRoom.socketId = socket.id;
    } else {
      users.push({
        id: data.id,
        senderId: data.senderId,
        chatId: data?.chatId,
        socketId: socket.id,
      });
    }
  });
});
