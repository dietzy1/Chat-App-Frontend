// @generated by protoc-gen-es v1.0.0 with parameter "target=ts"
// @generated from file protos/message/v1/messagegateway_service.proto (package messagegateway.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message messagegateway.v1.GetMessagesRequest
 */
export class GetMessagesRequest extends Message<GetMessagesRequest> {
  /**
   * @generated from field: string chat_room_uuid = 1;
   */
  chatRoomUuid = "";

  /**
   * @generated from field: string channel_uuid = 2;
   */
  channelUuid = "";

  constructor(data?: PartialMessage<GetMessagesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "messagegateway.v1.GetMessagesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "chat_room_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMessagesRequest {
    return new GetMessagesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMessagesRequest {
    return new GetMessagesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMessagesRequest {
    return new GetMessagesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetMessagesRequest | PlainMessage<GetMessagesRequest> | undefined, b: GetMessagesRequest | PlainMessage<GetMessagesRequest> | undefined): boolean {
    return proto3.util.equals(GetMessagesRequest, a, b);
  }
}

/**
 * @generated from message messagegateway.v1.GetMessagesResponse
 */
export class GetMessagesResponse extends Message<GetMessagesResponse> {
  /**
   * @generated from field: repeated messagegateway.v1.Msg messages = 1;
   */
  messages: Msg[] = [];

  constructor(data?: PartialMessage<GetMessagesResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "messagegateway.v1.GetMessagesResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "messages", kind: "message", T: Msg, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetMessagesResponse {
    return new GetMessagesResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetMessagesResponse {
    return new GetMessagesResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetMessagesResponse {
    return new GetMessagesResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetMessagesResponse | PlainMessage<GetMessagesResponse> | undefined, b: GetMessagesResponse | PlainMessage<GetMessagesResponse> | undefined): boolean {
    return proto3.util.equals(GetMessagesResponse, a, b);
  }
}

/**
 * @generated from message messagegateway.v1.EditMessageRequest
 */
export class EditMessageRequest extends Message<EditMessageRequest> {
  /**
   * @generated from field: string author = 1;
   */
  author = "";

  /**
   * @generated from field: string content = 2;
   */
  content = "";

  /**
   * @generated from field: string author_uuid = 3;
   */
  authorUuid = "";

  /**
   * @generated from field: string chat_room_uuid = 4;
   */
  chatRoomUuid = "";

  /**
   * @generated from field: string channel_uuid = 5;
   */
  channelUuid = "";

  /**
   * @generated from field: string message_uuid = 6;
   */
  messageUuid = "";

  /**
   * @generated from field: string timestamp = 7;
   */
  timestamp = "";

  constructor(data?: PartialMessage<EditMessageRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "messagegateway.v1.EditMessageRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "author", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "author_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "chat_room_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "channel_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "message_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "timestamp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EditMessageRequest {
    return new EditMessageRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EditMessageRequest {
    return new EditMessageRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EditMessageRequest {
    return new EditMessageRequest().fromJsonString(jsonString, options);
  }

  static equals(a: EditMessageRequest | PlainMessage<EditMessageRequest> | undefined, b: EditMessageRequest | PlainMessage<EditMessageRequest> | undefined): boolean {
    return proto3.util.equals(EditMessageRequest, a, b);
  }
}

/**
 * @generated from message messagegateway.v1.EditMessageResponse
 */
export class EditMessageResponse extends Message<EditMessageResponse> {
  /**
   * @generated from field: string author = 1;
   */
  author = "";

  /**
   * @generated from field: string content = 2;
   */
  content = "";

  /**
   * @generated from field: string author_uuid = 3;
   */
  authorUuid = "";

  /**
   * @generated from field: string chat_room_uuid = 4;
   */
  chatRoomUuid = "";

  /**
   * @generated from field: string channel_uuid = 5;
   */
  channelUuid = "";

  /**
   * @generated from field: string message_uuid = 6;
   */
  messageUuid = "";

  /**
   * @generated from field: string timestamp = 7;
   */
  timestamp = "";

  constructor(data?: PartialMessage<EditMessageResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "messagegateway.v1.EditMessageResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "author", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "author_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "chat_room_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "channel_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "message_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "timestamp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EditMessageResponse {
    return new EditMessageResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EditMessageResponse {
    return new EditMessageResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EditMessageResponse {
    return new EditMessageResponse().fromJsonString(jsonString, options);
  }

  static equals(a: EditMessageResponse | PlainMessage<EditMessageResponse> | undefined, b: EditMessageResponse | PlainMessage<EditMessageResponse> | undefined): boolean {
    return proto3.util.equals(EditMessageResponse, a, b);
  }
}

/**
 * @generated from message messagegateway.v1.DeleteMessageRequest
 */
export class DeleteMessageRequest extends Message<DeleteMessageRequest> {
  /**
   * @generated from field: string author = 1;
   */
  author = "";

  /**
   * @generated from field: string content = 2;
   */
  content = "";

  /**
   * @generated from field: string author_uuid = 3;
   */
  authorUuid = "";

  /**
   * @generated from field: string chat_room_uuid = 4;
   */
  chatRoomUuid = "";

  /**
   * @generated from field: string channel_uuid = 5;
   */
  channelUuid = "";

  /**
   * @generated from field: string message_uuid = 6;
   */
  messageUuid = "";

  /**
   * @generated from field: string timestamp = 7;
   */
  timestamp = "";

  constructor(data?: PartialMessage<DeleteMessageRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "messagegateway.v1.DeleteMessageRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "author", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "author_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "chat_room_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "channel_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "message_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "timestamp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteMessageRequest {
    return new DeleteMessageRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteMessageRequest {
    return new DeleteMessageRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteMessageRequest {
    return new DeleteMessageRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteMessageRequest | PlainMessage<DeleteMessageRequest> | undefined, b: DeleteMessageRequest | PlainMessage<DeleteMessageRequest> | undefined): boolean {
    return proto3.util.equals(DeleteMessageRequest, a, b);
  }
}

/**
 * @generated from message messagegateway.v1.DeleteMessageResponse
 */
export class DeleteMessageResponse extends Message<DeleteMessageResponse> {
  /**
   * @generated from field: string status = 1;
   */
  status = "";

  /**
   * @generated from field: string error = 2;
   */
  error = "";

  constructor(data?: PartialMessage<DeleteMessageResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "messagegateway.v1.DeleteMessageResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "status", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "error", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteMessageResponse {
    return new DeleteMessageResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteMessageResponse {
    return new DeleteMessageResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteMessageResponse {
    return new DeleteMessageResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteMessageResponse | PlainMessage<DeleteMessageResponse> | undefined, b: DeleteMessageResponse | PlainMessage<DeleteMessageResponse> | undefined): boolean {
    return proto3.util.equals(DeleteMessageResponse, a, b);
  }
}

/**
 * @generated from message messagegateway.v1.Msg
 */
export class Msg extends Message<Msg> {
  /**
   * @generated from field: string author = 1;
   */
  author = "";

  /**
   * @generated from field: string content = 2;
   */
  content = "";

  /**
   * @generated from field: string author_uuid = 3;
   */
  authorUuid = "";

  /**
   * @generated from field: string chat_room_uuid = 4;
   */
  chatRoomUuid = "";

  /**
   * @generated from field: string channel_uuid = 5;
   */
  channelUuid = "";

  /**
   * @generated from field: string message_uuid = 6;
   */
  messageUuid = "";

  /**
   * @generated from field: string timestamp = 7;
   */
  timestamp = "";

  constructor(data?: PartialMessage<Msg>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime = proto3;
  static readonly typeName = "messagegateway.v1.Msg";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "author", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "content", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "author_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "chat_room_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "channel_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "message_uuid", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "timestamp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Msg {
    return new Msg().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Msg {
    return new Msg().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Msg {
    return new Msg().fromJsonString(jsonString, options);
  }

  static equals(a: Msg | PlainMessage<Msg> | undefined, b: Msg | PlainMessage<Msg> | undefined): boolean {
    return proto3.util.equals(Msg, a, b);
  }
}

