/// <reference types="vite/client" />

interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (eventName: string, callback: (accounts: string[]) => void) => void;
    isMetaMask?: boolean;
  };
}