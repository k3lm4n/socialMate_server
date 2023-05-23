

const socket = io("http://localhost:3000");

socket.emit("room", { 
    // id: string;
    // content: string;
    // senderId: string;
    // receiverId?: string;
    // groupId?: string;
    // createdAt: Date;
});
 

socket.on("message", (data) => {
    console.log(data);

    
})