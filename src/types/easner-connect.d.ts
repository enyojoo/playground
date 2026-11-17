export type EasnerConnectError = {
  code?: string;
  message?: string;
};

export type EasnerConnectLinked = {
  code?: string;
  state?: string;
};

export type EasnerConnectHandlers = {
  clientSecret: string;
  onReady?: () => void;
  onLinked?: (result: EasnerConnectLinked) => void;
  onPaid?: () => void;
  onClose?: () => void;
  onError?: (error: EasnerConnectError) => void;
};

export type EasnerConnectGlobal = {
  connect: (options: EasnerConnectHandlers) => void;
  withdraw: (options: EasnerConnectHandlers) => void;
};

declare global {
  interface Window {
    EasnerConnect?: EasnerConnectGlobal;
  }
}

export {};
