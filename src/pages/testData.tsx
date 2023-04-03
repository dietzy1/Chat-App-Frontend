import {
  ChannelType,
  MessageType,
  UserType,
  ChatroomType,
} from "../types/interfaces";

const testMessage: MessageType = {
  author: "Bob",
  content: "Øv",
  /*  icon: testIcon, */
  timestamp: "16:40",
  /* uuid: "123", */
  authoruuid: "123",
  chatroomuuid: "123",
  channeluuid: "123",
};

const testMessage1: MessageType = {
  author: "Martin Vad",
  content: "Double øv",
  /*  icon: testIcon, */
  timestamp: "16:40",
  /*   uuid: "123", */
  authoruuid: "12345",
  chatroomuuid: "123",
  channeluuid: "123",
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
  icon: "https://ik.imagekit.io/imageAPI/user/298103bc-eb56-4cd2-9881-460bd4a90337.png",
  online: true,
  uuid: "123",
};

export const testUser2: UserType = {
  author: "TestAuthorBobing",
  icon: "https://ik.imagekit.io/imageAPI/user/194d9fa4-439a-437a-b675-df20c2da3872.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1677831746211",
  online: true,
  uuid: "123",
};

const testUser1: UserType = {
  author: "TestAuthor",
  icon: "https://ik.imagekit.io/imageAPI/user/defaultAvatar.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1677417476895",
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
  chatroomuuid: "123",
  channeluuid: "123",
};

const testChannel1: ChannelType = {
  chatroomuuid: "456",
  channeluuid: "456",
};

const testChannel2: ChannelType = {
  chatroomuuid: "789",
  channeluuid: "789",
};

export const testArrayChannel: ChannelType[] = [
  testChannel,
  testChannel1,
  testChannel2,
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
