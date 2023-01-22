export interface MessageType {
  author: string;
  message: string;
  /* icon: string; */
  timestamp: string;
  /*   uuid: string; */
  authoruuid: string;
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

export interface ChannelType {
  uuid: string;
  name: string;
}
