export {}

declare global {
  export interface Window {
    hello: string,
  }
  interface Error {
    code?: any;
  }
}