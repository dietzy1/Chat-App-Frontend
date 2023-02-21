//I need to implement some serializing functions here to convert everything to the protobuf schema

//Import the protobuf type from types
import {
  CreateMessageRequest,
  CreateMessageResponse,
} from "../proto/v1/message_service_pb";
import { MessageType } from "../types/interfaces";

//TODO:this function is still implemented incorrectly
//Marshal into the protobuf format
export function Marshal(m: MessageType): Uint8Array {
  const message = new CreateMessageRequest();
  //take the m object and set the fields in messsage
  message.author = m.author;
  message.content = m.content;
  message.authorUuid = m.authoruuid;
  message.chatRoomUuid = m.chatroomuuid;
  message.channelUuid = m.channeluuid;

  //perform check to see if the message is valid and contains all the required fields
  const error = Validate(message);
  if (error) {
    console.log(error);
    throw error;
  }
  return message.toBinary();
}

//Unmarshal into the protobuf format
export function Unmarshal(m: Uint8Array): MessageType {
  const msg = new CreateMessageResponse();

  try {
    msg.fromBinary(m);
  } catch (e) {
    console.log(e);
  }
  const message: MessageType = {
    author: msg.author,
    content: msg.content,
    authoruuid: msg.authorUuid,
    chatroomuuid: msg.chatRoomUuid,
    channeluuid: msg.channelUuid,
    timestamp: msg.timestamp,
  };

  return message;
}

//validate the protobuf message
export function Validate(m: CreateMessageRequest): boolean {
  if (m.author == undefined || m.author == null || m.author == "") {
    return true;
  }
  if (m.content == undefined || m.content == null || m.content == "") {
    return true;
  }
  if (m.authorUuid == undefined || m.authorUuid == null || m.authorUuid == "") {
    return true;
  }
  if (
    m.chatRoomUuid == undefined ||
    m.chatRoomUuid == null ||
    m.chatRoomUuid == ""
  ) {
    return true;
  }
  if (
    m.channelUuid == undefined ||
    m.channelUuid == null ||
    m.channelUuid == ""
  ) {
    return true;
  }
  return false;
}
