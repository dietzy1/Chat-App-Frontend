/** @format */

//I need to implement some serializing functions here to convert everything to the protobuf schema

//Import the protobuf type from types
import {
  CreateMessageRequest,
  CreateMessageResponse,
} from "../api/protos/message/v1/messagegateway_service_pb";
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
  const success = Validate(message);
  if (!success) {
    console.log(success);
    throw Error;
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
    messageuuid: msg.messageUuid,
    timestamp: msg.timestamp,
  };

  return message;
}

//validate the protobuf message
export function Validate(m: CreateMessageRequest): boolean {
  // @ts-ignore
  return (m.author &&
    m.content &&
    m.authorUuid &&
    m.chatRoomUuid &&
    m.channelUuid) as boolean;
}
