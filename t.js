const { io } = require("socket.io-client");
const socket = io("ws://localhost:3535");
socket.on("connect", () => {
    socket.emit('join', "all-state-changes-one");
    socket.emit('join', "all-state-changes-by-transaction");
    socket.emit('join', "new-contracts");
});
