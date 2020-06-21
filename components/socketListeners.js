const BlockChain = require("../utils/blockchain");

const room = '_room';
var sockets = [];
// var currentChain = [];
const socketListeners = (io) => {
  io.on('connection', socket => {
    console.log('id socket join ' + socket.id);
    sockets.push(socket.id);
    socket.join(room);
    console.log(sockets);
    socket.emit('CONNECT', {sockets});
    io.to(room).emit('hi');


    socket.on('CL REQUEST CHAIN',()=>{
      const r = getRandomInt(0,blockchain.getLength());
      socket.broadcast.to(sockets[r]).emit('SV REQUEST CHAIN',idSocket);
    })
    socket.on('CL SEND CHAIN', (idSocket,blockchain)=>{
      socket.broadcast.to(idSocket).emit('SV SEND CHAIN',blockchain);
    })


    socket.on('NEW BLOCK',() => {
      const block = BlockChain.getLastedBlock();
      io.to(room).emit('NEW BLOCK',block);
    });

    socket.on('COMPARE LATEST BLOCK', block =>{
      console.log(block);
      console.log('compare');
      io.to(room).emit('COMPARE LATEST BLOCK',{idSocket:socket.id,block});
    })

    socket.on('RESULT COMPARE LATEST BLOCK', (idSocket,result) =>{
      console.log('RESULT COMPARE LATEST BLOCK');
      io.to(idSocket).emit('RESULT COMPARE LATEST BLOCK',{idSocket,result});
    })

    socket.on('COMPARE CHAIN', chain =>{
      io.to(room).emit('COMPARE CHAIN',{idSocket:socket.id,chain});
    })

    socket.on('RESULT COMPARE CHAIN', (idSocket,blockchain,result) =>{
      socket.broadcast.to(idSocket).emit('RESULT COMPARE CHAIN',{idSocket,blockchain,result});
    })

    socket.on('disconnect', () => {
      console.log('id socket leave ' + socket.id);
      sockets = sockets.filter(s => s!=socket.id);
      socket.leave(room);
      console.log(sockets);
      
    });
  });
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = socketListeners;
