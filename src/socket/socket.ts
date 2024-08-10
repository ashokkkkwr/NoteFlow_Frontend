import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';

const socket: Socket = io(SERVER_URL, {
  auth: {
    token: sessionStorage.getItem('accessToken'),
  },
});

export default socket;
