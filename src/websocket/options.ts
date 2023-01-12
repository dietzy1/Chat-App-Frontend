interface WsOptions {
  share?: boolean;
  shouldReconnect?: (event: WebSocketEventMap["close"]) => boolean;
  reconnectInterval?: number;
  reconnectAttempts?: number;
  filter?: (message: WebSocketEventMap["message"]) => boolean;
  retryOnError?: boolean;
  onOpen?: (event: WebSocketEventMap["open"]) => void;
  onClose?: (event: WebSocketEventMap["close"]) => void;
  onMessage?: (event: WebSocketEventMap["message"]) => void;
  onError?: (event: WebSocketEventMap["error"]) => void;
  onReconnectStop?: (numAttempted: number) => void;
  fromSocketIO?: boolean;
  queryParams?: {
    [key: string]: string | number;
  };
  protocols?: string | string[];
  eventSourceOptions?: EventSourceInit;
}

//create a constructor object for the Options interface
export const options: WsOptions = {
  share: false,
  shouldReconnect: () => true,
  reconnectInterval: 1000,
  reconnectAttempts: 10,
  filter: () => true,
  retryOnError: true,
  onOpen: () => {},
  onClose: () => {},
  onMessage: () => {},
  onError: () => {},
  onReconnectStop: () => {},
  fromSocketIO: false,
  queryParams: {},
  protocols: [],
  eventSourceOptions: {},
};
