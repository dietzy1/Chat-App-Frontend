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
  name: string;
  icon: string;
  uuid: string;
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
