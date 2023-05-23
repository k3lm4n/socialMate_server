import { join } from "path";
import { io } from ".";
import { Message } from "../utils/types/@types";
import MessageModel from "../models/message";

interface Room {
  id: string;
  senderId: string;
  groupId?: string;
  receiverId?: string;
}

const users: Room[] = [];
const messageModel = new MessageModel();

io.on("connection", (socket) => {
//   console.log("connected ", socket.id);
  socket.on("createdMessage", (data) => {

    console.log(data);

    const userInRoom = users.find(
      (user) =>
        user.senderId === data.senderId &&
        (user.groupId === data.groupId || user.receiverId === data.receiverId)
    );

    if (userInRoom) {
      userInRoom.id = socket.id;
    } else {
      users.push({
        id: socket.id,
        senderId: data.senderId,
        groupId: data.groupId,
        receiverId: data.receiverId,
      });
    }

    // console.log(users);
  });

  socket.on("message", (data) => {
    const message: Message = {
      id: data.id,
      senderId: data.senderId,
      receiverId: data.receiverId,
      groupId: data.groupId,
      content: data.content,
      createdAt: new Date(),
    };

    // messageModel.create(message, data.req, data.res);

    if (data.group) io.to(data.groupId).emit("message", message);
    else io.to(data.receiverId).emit("message", message);
  });
});
