//I need to implement some serializing functions here to convert everything to the protobuf schema

//Import the protobuf type from types
import { CreateMessageRequest } from "../proto/v1/message_service_pb";
import { MessageType } from "../types/interfaces";

//Marshal into the protobuf format
export async function Marshal(m: MessageType) {
  //This type needs to be whatever the fuck protobuf returns
  try {
    const message = new CreateMessageRequest();
    //take the m object and set the fields in messsage
    message.author = m.author;
    message.content = m.content;
    message.authorUuid = m.authoruuid;
    message.chatRoomUuid = m.chatroomuuid;
    message.channelUuid = m.channeluuid;

    //perform check to see if the message is valid and contains all the required fields
    const errors = Validate(message);
    if (errors) {
      console.log(errors);
      return [null, errors];
    }

    return [message, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
}

//Unmarshal into the protobuf format
export function Unmarshal(m: MessageType): void {
  //This type needs to be whatever the fuck protobuf returns
}

//validate the protobuf message
export function Validate(m: CreateMessageRequest): Error | undefined {
  if (m.author == undefined || m.author == null || m.author == "") {
    return new Error("Author is undefined or null or empty");
  }
  if (m.content == undefined || m.content == null || m.content == "") {
    return new Error("Content is undefined or null or empty");
  }
  if (m.authorUuid == undefined || m.authorUuid == null || m.authorUuid == "") {
    return new Error("Author UUID is undefined or null or empty");
  }
  if (
    m.chatRoomUuid == undefined ||
    m.chatRoomUuid == null ||
    m.chatRoomUuid == ""
  ) {
    return new Error("Chatroom UUID is undefined or null or empty");
  }
  if (
    m.channelUuid == undefined ||
    m.channelUuid == null ||
    m.channelUuid == ""
  ) {
    return new Error("Channel UUID is undefined or null or empty");
  }
}
