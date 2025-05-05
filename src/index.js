import "./script.css";
import {createBoard} from "./helper/DOM.js";
import Player from "./helper/Player.js";

createBoard('.human.board');
createBoard('.computer.board');

const human = new Player();
const computer = new Player(true);

human.gameboard.placeShip(5, 0, 0);