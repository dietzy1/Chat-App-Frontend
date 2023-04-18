/** @format */

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
  shouldReconnect: () => true,
  reconnectInterval: 5000,
  reconnectAttempts: 30,

  retryOnError: true,
};
