import "./script.css";
import {createBoard} from "./helper/DOM.js";
import Player from "./helper/Player.js";
import {shipLengths} from "./helper/Constants.js";
import initialize from "./helper/Initialize.js"

createBoard('.computer.board');
createBoard('.human.board');

const computer = new Player(true);
const human = new Player();

shipLengths.forEach(length => {
    computer.gameboard.placeShipRandomly(length);
});

initialize(human);