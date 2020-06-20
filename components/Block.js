const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(data,key) {
        this.timestamp = Date.now();
        this.data = data;
        this.hash = this.computeHash();
        this.key = key;
      }
    
      computeHash() {
        return SHA256(
          this.index +
            this.precedingHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.key
        ).toString();
      }
    }
    


module.exports = Block;