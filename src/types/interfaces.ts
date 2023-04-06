/** @format */

export interface MessageType {
  author: string;
  content: string;
  authoruuid: string;
  chatroomuuid: string;
  channeluuid: string;
  messageuuid: string;
  timestamp?: string;
}

export interface UserType {
  author: string;
  icon: string;
  online: boolean;
  uuid: string;
}

export interface ChatroomType {
  users: string[];
  tags: string[];
  name: string;
  icon: string;
  uuid: string;
  owner: string;
  description: string;
  channels: ChannelType[];
}

export interface ChannelType {
  chatroomuuid: string;
  channeluuid: string;
}

export interface LoginError {
  error: string;
  bool: boolean;
}

interface User {
  icon: string;
  name: string;
  uuid: string;
  Discription: string;
  Joindate: string;
  Roles: string[];
  ChatServers: string[];
  Reports: number;
}
