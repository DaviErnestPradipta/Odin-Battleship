import "./script.css";
import {createBoard} from "./helper/DOM.js";
import Player from "./helper/Player.js";
import {shipLengths} from "./helper/Constants.js";
import initialize from "./helper/Initialize.js"

createBoard('.human.board');
createBoard('.computer.board');

const human = new Player();
const computer = new Player(true);

shipLengths.forEach(length => {
    computer.gameboard.placeShipRandomly(length);
});

initialize(human);