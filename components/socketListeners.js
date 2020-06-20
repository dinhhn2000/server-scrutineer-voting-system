const SocketActions = require('./constants');
const Block = require('./Block');
const Blockchain = require('./Blockchain');

const socketListeners = (io) => {
  const myblocks = new Blockchain();


  io.on('connection', socket => {
    console.log(socket.id);

    socket.on(SocketActions.ADD_VOTE, (data, key) => {
      myblocks.addNewBlock(new Block(data, key));
      socket.emit('DONE', myblocks.blockchain);
      socket.emit('CONNECT', 'aaaaaaa');
    });

    socket.on(''.END_MINING, () => {

    });

    io.on('disconnect', () => { /* … */ });
  });
};

module.exports = socketListeners;
