import { Manager } from "socket.io-client";

import { backendLink } from "../constants";

export const manager = new Manager(`${backendLink}`, {
  autoConnect: false,
});
