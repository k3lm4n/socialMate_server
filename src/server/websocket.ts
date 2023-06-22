import { join } from "path";
import { io } from ".";
import { Message } from "../utils/types/@types";
import MessageModel from "../model/message";
import { createAdapter } from "@socket.io/mongo-adapter";
import { MongoClient } from "mongodb";


interface Room {
  id: string;
  senderId: string;
  chatId?: string;
  socketId: string;
}


const users: Room[] = [];
const messageModel = new MessageModel();
const messages: Message[] = [];

io.on("connection", (socket) => {
  //   console.log("connected ", socket.id);
  socket.on("connectedOn", async (data, callback) => {
    // console.log(data);

    socket.join(data.chatId);

    const userInRoom = users.find(
      (user) => user.senderId === data.senderId && user?.chatId === data?.chatId
    );

    if (userInRoom) {
      userInRoom.socketId = socket.id;
    } else {
      // users.push({
      //   id: data.id,
      //   senderId: data.senderId,
      //   chatId: data?.chatId,
      //   socketId: socket.id,
      // });
      if (data.content) {
        const message = await messageModel.messaging(data);
        console.log("====================================");
        console.log(message);
        console.log("====================================");
      }
    }
    // console.log(users);
    // let messageReceived = getMessages(data.chatId);
    let messageReceived = await messageModel.getAll(data.chatId);

    callback(messageReceived);
  });

  socket.on("createdMessage", async (data) => {
    const message: Message = {
      id: data.id,
      senderId: data.senderId,
      chatId: data.chatId,
      content: data.content,
    };
    if (message.content) {
      const select = await messageModel.messaging(message);
      console.log("====================================");
      console.log(select);
      console.log("====================================");
    }

    // messageModel.create(message, data.req, data.res);
    // io.to(data.chatId).emit("newIncomingMessage", message);
  });
});

function getMessages(chatId: string) {
  let messagesReceived: Message[] = messages.filter(
    (message) => message.chatId === chatId
  );
  return messagesReceived;
}
