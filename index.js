class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }
  
    hit() {
        if (this.hits < this.length) this.hits++;
    }
  
    isSunk() {
      return this.hits >= this.length;
    }
}
  
const destroyer = new Ship(3);
destroyer.hit();
destroyer.hit();
console.log(destroyer.isSunk());
destroyer.hit();
console.log(destroyer.isSunk());