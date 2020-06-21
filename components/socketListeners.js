const BlockChain = require("../utils/blockchain");
const Vote = require("./votes/models");

const room = '_room';
var sockets = [];
var currentChain = [];
const socketListeners = (io) => {
  io.on('connection', socket => {
    sockets.push(socket.id);
    socket.join(room);
    console.log(sockets);
    socket.emit('CONNECT', {sockets,currentChain});
    io.to(room).emit('hi');

    socket.on('VOTE', (newVote) => {
      console.log(newVote)
      io.to(room).emit('NEW VOTE',newVote);
    });

    socket.on('SYNC', data=>{
      io.to(room).emit('SYNC', data);
    })

    socket.on('UPDATE', chain =>{
      if(chain.length > currentChain.length) currentChain = chain;
    })

    socket.on('disconnect', () => {
      sockets = sockets.filter(s => s===socket.id);
      socket.leave(room);
      console.log(sockets);
    });
  });
};

module.exports = socketListeners;
