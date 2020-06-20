const Block = require('./Block');

class Blockchain{
    constructor() {
        this.blockchain = [this.startGenesisBlock()];
      }
      startGenesisBlock() {
        return new Block(0,"Initial Block in the Chain", "");
      }
    
      obtainLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
      }
      addNewBlock(newBlock) {
        const previous = this.obtainLatestBlock();
        newBlock.precedingHash = previous.hash;
        newBlock.index = previous.index + 1;
        this.blockchain.push(newBlock);
      }
    
      checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
          const currentBlock = this.blockchain[i];
          const precedingBlock = this.blockchain[i - 1];
    
          if (currentBlock.hash !== currentBlock.computeHash()) {
            return false;
          }
          if (currentBlock.precedingHash !== precedingBlock.hash) return false;
        }
        return true;
      }
    }
module.exports = Blockchain;