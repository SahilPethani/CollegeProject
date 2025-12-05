// socket.js

import io from "socket.io-client";

// const baseURL = `http://localhost:7000`;
const baseURL = `https://hrms-api-r2bj.onrender.com`;

const socket = io(baseURL); 

socket.on("connect", () => {
  console.log("Connected to socket.io server");
});

export default socket;
