import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as socket from './classes/socket';
import { User } from './classes/user';
import { Grid } from './classes/grid-generator';

const PORT = 5000;
const app = express();
const httpServer = new http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (client: any) => {
  
  socket.disconnectClient(client, io);
  socket.addUserOnline(client, io);
  socket.removeUserOnline(client, io);
  socket.setBiasCharacter(client, io);

  setInterval(()=>{
    if(client.id && User.getUserList().find((user)=>user.id==client.id)){
      Grid.gridGenerator()
      io.to(client.id).emit('get-grid',Grid.getGrid())
    }
  },1000)
  
});

httpServer.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
  
});