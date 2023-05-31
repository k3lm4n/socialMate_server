import { join } from "path";
import { io } from ".";
import { Message } from "../utils/types/@types";
import MessageModel from "../controllers/message";

interface Room {
  id: string;
  senderId: string;
  receiverId?: string;
  socketId: string;
}

const users: Room[] = [];
const messageModel = new MessageModel();
const messages: Message[] = [];

io.on("connection", (socket) => {
  //   console.log("connected ", socket.id);
  socket.on("connectedOn", (data, callback) => {
    // console.log(data);

    socket.join(data.receiverId);

    const userInRoom = users.find(
      (user) =>
        user.senderId === data.senderId && user?.receiverId === data?.receiverId
    );

    if (userInRoom) {
      userInRoom.socketId = socket.id;
    } else {
      users.push({
        id: data.id,
        senderId: data.senderId,
        receiverId: data?.receiverId,
        socketId: socket.id,
      });
    }
    // console.log(users);
    let messageReceived = getMessages(data.receiverId);

    callback(messageReceived);
  });

  socket.on("createdMessage", (data) => {
    const message: Message = {
      id: data.id,
      senderId: data.senderId,
      receiverId: data.receiverId,
      content: data.content,
      createdAt: new Date(),
    };
    messages.push(message);


    // messageModel.create(message, data.req, data.res);
    // io.to(data.receiverId).emit("newIncomingMessage", message);
  });
});

function getMessages(receiverId: string) {
  let messagesReceived: Message[] = messages.filter(
    (message) => message.receiverId === receiverId
  );
  return messagesReceived;
}
