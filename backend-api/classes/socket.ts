import socketIO, { Socket } from 'socket.io';
import { User } from './user';
import { Grid } from './grid-generator';
import { Payment } from './payment';

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
    io.to(client.id).emit('get-payments', Payment.getPaymentList());
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

export const savePaymentMove = (client: Socket, io: socketIO.Server) => {
  client.on('save-payment', (payload) => {
    Payment.savePayment(payload.payment)
    io.emit('get-payments', Payment.getPaymentList());
  });
};
