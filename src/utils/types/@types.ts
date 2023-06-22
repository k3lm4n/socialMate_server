export interface Message {
  id: string;
  content: string;
  senderId: string;
  chatId: string;
}

export interface User {
  id: string;
  username: string;
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  createdAt: Date;
  users: User[];
  messages: Message[];
}
