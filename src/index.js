import "./script.css";
import {createBoard} from "./helper/DOM.js";
import Player from "./helper/Player.js";

createBoard('.human.board');
createBoard('.computer.board');

const human = new Player();
const computer = new Player(true);

human.gameboard.placeShip(5, 1, 1);
human.gameboard.placeShip(4, 1, 3, true);
human.gameboard.placeShip(3, 4, 3);
human.gameboard.placeShip(2, 8, 1, true);
human.gameboard.placeShip(1, 8, 6);
human.gameboard.placeShip(1, 4, 6);

computer.gameboard.placeShip(5, 1, 1);
computer.gameboard.placeShip(4, 1, 3, true);
computer.gameboard.placeShip(3, 4, 3);
computer.gameboard.placeShip(2, 8, 1, true);
computer.gameboard.placeShip(1, 8, 6);
computer.gameboard.placeShip(1, 4, 6);