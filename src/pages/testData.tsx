import { MessageType, UserType } from "../types/interfaces";

const testMessage: MessageType = {
  author: "Bob",
  message:
    "Det her er en test tekst besked, som er skrevet af en test bruger, som hedder Bob Det her er en test tekst besked, som er skrevet af en test bruger, som hedder Bob",
  /*  icon: testIcon, */
  timestamp: "16:40",
  /* uuid: "123", */
  authoruuid: "123",
};

const testMessage1: MessageType = {
  author: "Martin Vad",
  message:
    "det her er en test besked, som er skrevet af en test bruger, som hedder Martin",
  /*  icon: testIcon, */
  timestamp: "16:40",
  /*   uuid: "123", */
  authoruuid: "12345",
};

export interface ChatRoomType {
  name: string;
  icon: string;
  uuid: string;
}

export const testArrayMessage: MessageType[] = [
  testMessage,
  testMessage,
  testMessage,
  testMessage1,
  testMessage,
  testMessage,
  testMessage,
  testMessage1,
  testMessage,
  testMessage1,
  testMessage,
  testMessage1,
  testMessage,
];

export const testUser: UserType = {
  author: "TestAuthor",
  icon: "https://i.imgur.com/0y0tj0x.png",
  online: true,
  uuid: "123",
};

const testUser1: UserType = {
  author: "TestAuthor",
  icon: "https://i.imgur.com/0y0tj0x.png",
  online: false,
  uuid: "123",
};

export const testArrayUser: UserType[] = [
  testUser,
  testUser,
  testUser,
  testUser,
  testUser,
  testUser1,
  testUser1,
];

export const testChatRoom: ChatRoomType = {
  name: "TestAuthors's chatroom",
  icon: "https://i.imgur.com/0y0tj0x.png",
  uuid: "123",
};

export const testArrayChatRoom: ChatRoomType[] = [
  testChatRoom,
  testChatRoom,
  testChatRoom,
  testChatRoom,
  testChatRoom,
];
