import {BOARD_SIZE} from "./Constants.js";
import Gameboard from "./Gameboard.js";

export default class Player {
    constructor (isComputer = false) {
        this.isComputer = isComputer;
        this.gameboard = new Gameboard(isComputer? '.computer.board' : '.human.board');
        this.attacksMade = new Set();
    }

    attack(opponentBoard, x, y) {
        opponentBoard.receiveAttack(x, y);
    }

    randomAttack(opponentBoard) {
        let x, y, key;
        do {
            x = Math.floor(Math.random() * BOARD_SIZE);
            y = Math.floor(Math.random() * BOARD_SIZE);
            key = `${x},${y}`;
        } while (this.attacksMade.has(key));

        this.attacksMade.add(key);
        this.attack(opponentBoard, x, y);
        return [x, y];
    }
}