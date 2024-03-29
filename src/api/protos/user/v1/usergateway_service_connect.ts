// @generated by protoc-gen-connect-es v0.8.6 with parameter "target=ts"
// @generated from file protos/user/v1/usergateway_service.proto (package usergateway.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { ChangeAvatarRequest, ChangeAvatarResponse, EditDescriptionRequest, EditDescriptionResponse, GetAvatarsRequest, GetAvatarsResponse, GetUserRequest, GetUserResponse, GetUsersRequest, GetUsersResponse } from "./usergateway_service_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service usergateway.v1.UserGatewayService
 */
export const UserGatewayService = {
  typeName: "usergateway.v1.UserGatewayService",
  methods: {
    /**
     * @generated from rpc usergateway.v1.UserGatewayService.GetUser
     */
    getUser: {
      name: "GetUser",
      I: GetUserRequest,
      O: GetUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc usergateway.v1.UserGatewayService.GetUsers
     */
    getUsers: {
      name: "GetUsers",
      I: GetUsersRequest,
      O: GetUsersResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc usergateway.v1.UserGatewayService.EditDescription
     */
    editDescription: {
      name: "EditDescription",
      I: EditDescriptionRequest,
      O: EditDescriptionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc usergateway.v1.UserGatewayService.ChangeAvatar
     */
    changeAvatar: {
      name: "ChangeAvatar",
      I: ChangeAvatarRequest,
      O: ChangeAvatarResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc usergateway.v1.UserGatewayService.GetAvatars
     */
    getAvatars: {
      name: "GetAvatars",
      I: GetAvatarsRequest,
      O: GetAvatarsResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

