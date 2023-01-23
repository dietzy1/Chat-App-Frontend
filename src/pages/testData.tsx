import {
  ChannelType,
  MessageType,
  UserType,
  ChatroomType,
} from "../types/interfaces";

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
    "det her er en test besked, som er skrevet af en test bruger, som hedder Martin Og han siger altid fuck det hele",
  /*  icon: testIcon, */
  timestamp: "16:40",
  /*   uuid: "123", */
  authoruuid: "12345",
};

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
  icon: "https://ik.imagekit.io/imageAPI/pepes/0cddd5aa-185f-4d57-8264-db93eff2afc9.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1670852349594",
  online: true,
  uuid: "123",
};

export const testUser2: UserType = {
  author: "TestAuthorBobing",
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
  testUser2,
  testUser,
  testUser,
  testUser2,
  testUser1,
  testUser1,
];

export const testChannel: ChannelType = {
  uuid: "123",
  name: "General",
};

export const testArrayChannel: ChannelType[] = [
  testChannel,
  testChannel,
  testChannel,
];

export const testChatRoom: ChatroomType = {
  users: ["123", "1234", "12345"],
  tags: ["tag1", "tag2", "tag3"],
  name: "TestAuthors's chatroom",
  icon: "https://ik.imagekit.io/imageAPI/pepes/0cddd5aa-185f-4d57-8264-db93eff2afc9.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1670852349594",
  uuid: "123",
  owner: "12345678",
  description: "This is a test chatroom",
  channels: testArrayChannel,
};

export const testArrayChatRoom: ChatroomType[] = [
  testChatRoom,
  testChatRoom,
  testChatRoom,
  testChatRoom,
  testChatRoom,
];
