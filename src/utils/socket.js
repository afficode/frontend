import { io } from "socket.io-client";
import { backendLink } from "../constants";

export const socket = io(`${backendLink}`);
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("user up", () => {
	console.log("connected", socket.id); // x8WIv7-mJelg7on_ALbx
});