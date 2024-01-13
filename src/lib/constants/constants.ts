import { Card } from "./declarations";

export const COMPANY_NAME = 'pragma';

export const serverPath = "http://localhost:3000";

export const cards:Card[] = [
    { content: "0", voted: false },
    { content: "1", voted: false },
    { content: "2", voted: false },
    { content: "3", voted: false },
    { content: "4", voted: false },
    { content: "5", voted: false },
    { content: "6", voted: false },
    { content: "7", voted: false },
    { content: "8", voted: false },
    { content: "9", voted: false },
    { content: "☕", voted: false },
    { content: "?", voted: false },
];

export enum ioEvents {
    createRoom = "createRoom",
    addPlayer = "addPlayer",
    vote = "vote",
    reset = "reset",
    reveal = "reveal",
    disconnect = "disconnect",
    connect = "connect",
    connect_error = "connect_error",
    connect_timeout = "connect_timeout",
    reconnect = "reconnect",
    reconnect_attempt = "reconnect_attempt",
}