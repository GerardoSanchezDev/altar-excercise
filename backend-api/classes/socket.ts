import socketIO, { Socket } from 'socket.io';
import { User } from './user';
import { Grid } from './grid-generator';

export const disconnectClient = (client: Socket, io: socketIO.Server) => {
  client.on('disconnect', () => {
    User.removeUser(client.id);
  });
};

export const addUserOnline = (client: Socket, io: socketIO.Server) => {
  client.on('add-user', (payload) => {
    payload.id = client.id;
    User.addUser(payload);
    io.to(client.id).emit('user-id', client.id);
  });
};
export const removeUserOnline = (client: Socket, io: socketIO.Server) => {
  client.on('exit', () => {
    User.removeUser(client.id);
  });
};

export const setBiasCharacter = (client: Socket, io: socketIO.Server)=>{
  client.on('set-bias-character',(payload)=>{
    Grid.setBias(payload.character)
  })
}
